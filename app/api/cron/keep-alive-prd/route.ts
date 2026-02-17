/**
 * Vercel Cron - Keep-Alive para Backend PRD
 *
 * ESTRATÉGIA ANTI-COLD START:
 * ─────────────────────────────────────────────────────────────────
 * Mantém Backend PRD (Render) e Database PRD (Neon) sempre ativos
 * durante horários de funcionamento do negócio.
 *
 * HORÁRIOS:
 * - Ativo: 00h-01h + 10h-00h (15h/dia)
 * - Silêncio: 01h-10h (9h/dia)
 *
 * COLD START SEM KEEP-ALIVE:
 * - Render: 30-60 segundos (suspende após 15min idle)
 * - Neon: 2-5 segundos (suspende após 5min idle)
 * - Total: ~35-65s de delay na primeira requisição
 *
 * ECONOMIA DE RECURSOS:
 * - Render: 450h/mês (vs. 720h em 24h) = economiza 270h
 * - Dentro do free tier: 750h/mês disponíveis
 *
 * CONFIGURAÇÃO:
 * - Intervalo: 4 minutos (mantém ambos serviços acordados)
 * - Schedule: a cada 4 min nas horas 0, 10-23 (via vercel.json)
 *
 * OBSERVAÇÃO:
 * - Primeiras requisições após 10h terão cold start (~60s)
 * - Trade-off aceitável: sem clientes entre 1h-10h
 *
 * @see https://vercel.com/docs/cron-jobs
 * @see https://crontab.guru para entender sintaxe cron
 */

export async function GET() {
  try {
    // URL do backend PRD (será configurada quando criar o backend)
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL_PRD ||
      'https://ohana-api-prod.onrender.com/api';

    // Ping no endpoint de health check
    const response = await fetch(`${backendUrl}/ping`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Vercel-Cron-KeepAlive/1.0',
      },
    });

    const data = await response.json();

    return Response.json(
      {
        success: true,
        pinged: backendUrl,
        status: response.status,
        backend: data,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error: any) {
    // Em caso de erro, retornar 500 mas continuar tentando nos próximos crons
    console.error('[Keep-Alive] Erro ao pingar backend PRD:', error.message);

    return Response.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
