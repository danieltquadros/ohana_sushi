import { Col, Flex, Row, Typography } from 'antd';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { AddressFormContainer, ZipCodeBox } from './styles';
import Icon from '@mdi/react';
import { mdiMapMarkerRadiusOutline } from '@mdi/js';
import InputForm from '@/components/InputForm';
import { AddressProps } from '@/interfaces/AddressForm';
import { IoIosContact } from 'react-icons/io';
import { getZipCodeService } from '@/services/api';
import { AddressFormError } from '@/interfaces/AddressFormError';
import InputSendCalculation from '@/components/InputSendCalculation';

interface AddressFormProps {
  addressForm: AddressProps;
  onAddressForm: (addressForm: AddressProps) => void;
  addressFormError: AddressFormError;
  onAddressFormError: Dispatch<SetStateAction<AddressFormError>>;
}

const AddressForm = ({
  addressForm,
  onAddressForm,
  addressFormError,
  onAddressFormError,
}: AddressFormProps) => {
  const { Title } = Typography;

  const [showZipCodeErrorMessage, setShowZipCodeErrorMessage] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const cleaned = value.replace(/\D/g, '');

    // Se não houver números, retorna string vazia
    if (cleaned.length === 0) {
      return '';
    }

    // Aplica a máscara (XX) XXXXX-XXXX
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

    if (!match) return '';

    const formatted = !match[1]
      ? ''
      : !match[2]
        ? `(${match[1]}`
        : !match[3]
          ? `(${match[1]}) ${match[2]}`
          : `(${match[1]}) ${match[2]}-${match[3]}`;

    return formatted;
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    onAddressForm({ ...addressForm, name: newName });

    if (newName.length) {
      onAddressFormError({
        ...addressFormError,
        name: false,
      });
    }
  };

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    onAddressForm({ ...addressForm, phone: formatted });

    if (formatted) {
      onAddressFormError({
        ...addressFormError,
        phone: false,
      });
    }
  };

  const getZipCodeRequest = async (zipCode: string) => {
    const newZipCodeState = zipCode.replace(/(\d{5})(\d{3})/, '$1-$2');
    onAddressForm({
      ...addressForm,
      zipCode: newZipCodeState,
    });
    try {
      const response = await getZipCodeService(zipCode);
      if (response?.erro) {
        setShowZipCodeErrorMessage(true);
        return;
      }

      const newAddressForm = {
        ...addressForm,
        zipCode: newZipCodeState,
        streetName: response?.logradouro ? response?.logradouro : '',
        neighborhood: response?.bairro ? response?.bairro : '',
        city: response?.localidade ? response?.localidade : '',
      };

      onAddressForm(newAddressForm);
      setShowZipCodeErrorMessage(false);
      onAddressFormError({
        ...addressFormError,
        streetName: false,
        neighborhood: false,
        city: false,
      });
    } catch (error: any) {
      setShowZipCodeErrorMessage(true);
    }
  };

  const handleZipCode = (event: ChangeEvent<HTMLInputElement>) => {
    const newZipCode = event.target.value.replace(/\D/g, '');
    setShowZipCodeErrorMessage(false);
    if (newZipCode.length < 8) {
      onAddressForm({
        ...addressForm,
        zipCode: newZipCode.replace(/(\d{5})(\d{3})/, '$1-$2'),
      });
      return;
    }

    if (newZipCode.length === 8) {
      getZipCodeRequest(newZipCode);
    }
  };

  const handleStreetName = (event: ChangeEvent<HTMLInputElement>) => {
    const newStreetName = event.target.value;
    onAddressForm({ ...addressForm, streetName: newStreetName });

    if (newStreetName) {
      onAddressFormError({
        ...addressFormError,
        streetName: false,
      });
    }
  };

  const handleNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const newNumber = event.target.value;
    onAddressForm({ ...addressForm, number: newNumber });

    if (newNumber) {
      onAddressFormError({
        ...addressFormError,
        number: false,
      });
    }
  };

  const handleComplement = (event: ChangeEvent<HTMLInputElement>) => {
    const newComplement = event.target.value;
    onAddressForm({ ...addressForm, complement: newComplement });
  };

  const handleNeighborhood = (event: ChangeEvent<HTMLInputElement>) => {
    const newNeighborhood = event.target.value;
    onAddressForm({ ...addressForm, neighborhood: newNeighborhood });

    if (newNeighborhood) {
      onAddressFormError({
        ...addressFormError,
        neighborhood: false,
      });
    }
  };

  const handleCity = (event: ChangeEvent<HTMLInputElement>) => {
    const newCity = event.target.value;
    onAddressForm({ ...addressForm, city: newCity });

    if (newCity) {
      onAddressFormError({
        ...addressFormError,
        city: false,
      });
    }
  };

  const handleReference = (event: ChangeEvent<HTMLInputElement>) => {
    const newReference = event.target.value;
    onAddressForm({ ...addressForm, reference: newReference });
  };

  return (
    <AddressFormContainer gap={8} vertical>
      <Flex align="center" gap={8}>
        <IoIosContact style={{ fontSize: '24px', color: '#d81616' }} />
        <Title
          level={5}
          style={{
            marginBottom: 0,
            fontFamily: 'var(--inria-sans) !important',
            fontSize: '1.25rem',
          }}
        >
          Contato:
        </Title>
      </Flex>
      <Row gutter={8}>
        <Col xs={24} md={12}>
          <InputForm
            label="Nome"
            required
            value={addressForm.name}
            onChange={handleName}
            maxLength={100}
            errorMessage={
              addressForm.name.length === 0
                ? 'Nome é obrigatório'
                : addressForm.name.length === 1
                  ? 'Nome deve ter pelo menos 2 caracteres'
                  : 'Nome inválido'
            }
            showErrorMessage={addressFormError.name}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputForm
            label="Whatsapp"
            required
            value={addressForm.phone}
            onChange={handlePhone}
            maxLength={15}
            errorMessage={
              !addressForm.phone.length
                ? 'Número do whatsapp é obrigatório'
                : 'Número do whatsapp inválido'
            }
            showErrorMessage={addressFormError.phone}
          />
        </Col>
      </Row>
      <Flex align="center" gap={8} style={{ width: 'fit-content' }}>
        <Icon path={mdiMapMarkerRadiusOutline} size={1} color="#d81616" />
        <Title
          level={5}
          style={{
            marginBottom: 0,
            wordBreak: 'normal',
            fontFamily: 'var(--inria-sans) !important',
            fontSize: '1.25rem',
          }}
        >
          Endereço:
        </Title>
      </Flex>
      <Row gutter={8}>
        <Col span={24}>
          <ZipCodeBox>
            <InputForm
              label="Buscar endereço por CEP"
              value={addressForm.zipCode}
              onChange={handleZipCode}
              errorMessage="CEP inválido!"
              showErrorMessage={showZipCodeErrorMessage}
            />
          </ZipCodeBox>
        </Col>
        <Col xs={24} md={18}>
          <InputForm
            label="Logradouro (rua/avenida...)"
            required
            value={addressForm.streetName}
            onChange={handleStreetName}
            errorMessage="Logradouro é obrigatório"
            showErrorMessage={addressFormError.streetName}
          />
        </Col>
        <Col xs={8} md={6}>
          <InputForm
            label="Número"
            required
            value={addressForm.number}
            onChange={handleNumber}
            errorMessage="Número é obrigatório"
            showErrorMessage={addressFormError.number}
          />
        </Col>
        <Col xs={16} md={12}>
          <InputForm
            label="Complemento"
            value={addressForm.complement}
            onChange={handleComplement}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputSendCalculation
            label="Bairro"
            required
            value={addressForm.neighborhood}
            onChange={handleNeighborhood}
            errorMessage="Bairro é obrigatório"
            showErrorMessage={addressFormError.neighborhood}
            addressForm={addressForm}
            onAddressForm={onAddressForm}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputForm
            label="Cidade"
            required
            value={addressForm.city}
            onChange={handleCity}
            errorMessage="Cidade é obrigatória"
            showErrorMessage={addressFormError.city}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputForm
            label="Ponto de referência"
            value={addressForm.reference}
            onChange={handleReference}
          />
        </Col>
      </Row>
    </AddressFormContainer>
  );
};

export default AddressForm;
