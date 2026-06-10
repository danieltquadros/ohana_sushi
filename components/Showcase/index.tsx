import { Carousel, Col, Flex, Row, Select } from 'antd';
import {
  ProductTypeTitle,
  ProductTypeTitleFlex,
  SearchAnFilterFlex,
  ShowcaseContainerFlex,
  ShowCaseFlex,
} from './styles';

import Icon from '@mdi/react';
import { IoMdSwitch } from 'react-icons/io';
import { mdiMagnify } from '@mdi/js';
import InputForm from '../InputForm';
import { ChangeEvent, useEffect, useState, useTransition } from 'react';
import ProductCard from '../ProductCard';
import useResponsive from '@/hooks/useResponsive';
import Cart from '../Cart';
import FilterDrawer from './components/FilterDrawer';
import ButtonLink from '../ButtonLink';
import ContainerLoading from '../Loadings/ContainerLoading';
import SwitchFilter from '../SwitchFilter';
import useMenu from '@/hooks/useMenu';
import { MenuSection } from '@/interfaces/MenuSection';
import './styles.css';

interface ShowcaseProps {
  isNavigating: boolean;
  setIsNavigating: React.Dispatch<React.SetStateAction<boolean>>;
}

const ALL_SECTIONS = 'ALL';

const Showcase = ({ isNavigating, setIsNavigating }: ShowcaseProps) => {
  const { isXxl, isLg, isLgDown, isMdDown, isXs } = useResponsive();
  const { sections, loading: loadingMenu, error } = useMenu();
  const [sectionsFiltered, setSectionsFiltered] = useState<MenuSection[]>([]);
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([
    ALL_SECTIONS,
  ]);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSectionFilter = (active: boolean, sectionKey: string) => {
    setLoadingList(true);

    startTransition(() => {
      if (
        sectionKey === ALL_SECTIONS ||
        (selectedSectionIds.length === 1 && !active)
      ) {
        setSelectedSectionIds([ALL_SECTIONS]);
        setSectionsFiltered(sections);
        setLoadingList(false);
        return;
      }

      const nextSelected = active
        ? [...selectedSectionIds.filter((k) => k !== ALL_SECTIONS), sectionKey]
        : selectedSectionIds.filter((k) => k !== sectionKey);

      setSelectedSectionIds(nextSelected);

      const filtered = sections.map((section) =>
        nextSelected.includes(String(section.id))
          ? section
          : { ...section, items: [] },
      );

      setSectionsFiltered(filtered);
      setLoadingList(false);
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    const filtered = sections.map((section) => {
      const items = section.items.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.ingredientList.some((ingredient) =>
            ingredient.name.toLowerCase().includes(search),
          ),
      );
      return { ...section, items };
    });
    setSectionsFiltered(filtered);
  };

  useEffect(() => {
    setSectionsFiltered(sections);
  }, [sections]);

  if (loadingMenu) {
    return (
      <ShowcaseContainerFlex vertical align="center">
        <ContainerLoading />
      </ShowcaseContainerFlex>
    );
  }

  if (error) {
    return (
      <ShowcaseContainerFlex vertical align="center">
        <Flex style={{ padding: '32px', color: '#d81616' }}>
          Erro ao carregar o menu. Tente novamente mais tarde.
        </Flex>
      </ShowcaseContainerFlex>
    );
  }

  return (
    <ShowcaseContainerFlex vertical align="center">
      <Flex
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          background: isMdDown ? '' : 'rgba(0, 0, 0, 0.85)',
          boxShadow: '1.5px 1.5px 4px #d8161620 !important',
          zIndex: 1000,
          backdropFilter: 'blur(8px)',
        }}
        justify="center"
        align="center"
        vertical
      >
        <SearchAnFilterFlex
          align="center"
          justify="space-between"
          className="show-case-flex"
          gap={16}
          style={{
            background: isMdDown ? 'rgba(0, 0, 0, 0.85)' : '',
          }}
        >
          <InputForm
            placeholder="Buscar"
            suffix={<Icon path={mdiMagnify} size={1} color="#d81616" />}
            redStyled
            onChange={handleSearch}
            allowClear
            props={{
              style: {
                width: isXs ? '100%' : '420px',
              },
            }}
            containerWidth={isXs ? '100%' : '420px'}
          />
          <Cart isNavigating={isNavigating} setIsNavigating={setIsNavigating} />
        </SearchAnFilterFlex>
        {isMdDown ? (
          <Flex
            style={{
              padding: '8px',
              width: '100%',
              background: '#f7f7f7',
              boxShadow: '2px 2px 4px #00000030',
            }}
            justify="space-between"
            gap={8}
            className="md-down-showcase-filter"
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              value={
                selectedSectionIds.includes(ALL_SECTIONS)
                  ? ['Todos']
                  : sections
                      .filter((section) =>
                        selectedSectionIds.includes(String(section.id)),
                      )
                      .map((section) => section.label)
              }
              onDeselect={(value) => {
                const target = sections.find(
                  (section) => section.label === value,
                );
                handleSectionFilter(
                  false,
                  target ? String(target.id) : ALL_SECTIONS,
                );
              }}
              onClear={() => handleSectionFilter(true, ALL_SECTIONS)}
              showSearch={false}
              open={false}
              suffixIcon={null}
            />

            <ButtonLink onClick={() => setOpenFilterDrawer(!openFilterDrawer)}>
              <IoMdSwitch style={{ width: '1.5rem', height: '1.5rem' }} />{' '}
              Filtros
            </ButtonLink>
            <FilterDrawer
              open={openFilterDrawer}
              onClose={() => setOpenFilterDrawer(false)}
              selectedSectionIds={selectedSectionIds}
              handleSectionFilter={handleSectionFilter}
              sections={sections}
              loading={loadingList || isPending}
            />
          </Flex>
        ) : null}
      </Flex>
      {!isXxl && !isMdDown ? (
        <Flex
          justify="center"
          style={{
            width: '100%',
            boxShadow: '2px 2px 4px #00000030',
            background: '#f7f7f7',
            position: 'sticky',
            top: 72,
            zIndex: 999,
          }}
        >
          <Flex
            style={{
              width: '100%',
              maxWidth: '1344px',
              padding: '8px 16px',
            }}
            gap={8}
            wrap="wrap"
            vertical={isXxl}
          >
            <SwitchFilter
              label="Todos"
              selectedProductType={selectedSectionIds.includes(ALL_SECTIONS)}
              handleProductFilter={() =>
                handleSectionFilter(
                  selectedSectionIds.includes(ALL_SECTIONS),
                  ALL_SECTIONS,
                )
              }
              loading={loadingList || isPending}
              defaultChecked={true}
            />
            {sections.map((section) => {
              const key = String(section.id);
              return (
                <SwitchFilter
                  key={key}
                  label={section.label}
                  selectedProductType={selectedSectionIds.includes(key)}
                  handleProductFilter={() =>
                    handleSectionFilter(
                      !selectedSectionIds.includes(key),
                      key,
                    )
                  }
                  loading={loadingList || isPending}
                />
              );
            })}
          </Flex>
        </Flex>
      ) : null}
      <Flex
        style={{
          width: '100vw',
          maxWidth: isMdDown
            ? '760px'
            : isLg
              ? '1034px'
              : !isXxl
                ? '1344px'
                : '1524px',
          position: 'sticky',
          top: 0,
        }}
        vertical={!isXxl}
      >
        {isXxl ? (
          <Flex
            style={{
              width: '180px',
              padding: '32px 0px 16px 16px',
              background: 'transparent',
              position: 'sticky',
              top: 72,
              marginBottom: -72,
              zIndex: 999,
              height: '100vh',
            }}
            gap={8}
            vertical={isXxl}
          >
            <SwitchFilter
              label="Todos"
              selectedProductType={selectedSectionIds.includes(ALL_SECTIONS)}
              handleProductFilter={() =>
                handleSectionFilter(
                  selectedSectionIds.includes(ALL_SECTIONS),
                  ALL_SECTIONS,
                )
              }
              loading={loadingList || isPending}
              defaultChecked={true}
            />
            {sections.map((section) => {
              const key = String(section.id);
              return (
                <SwitchFilter
                  key={key}
                  label={section.label}
                  selectedProductType={selectedSectionIds.includes(key)}
                  handleProductFilter={() =>
                    handleSectionFilter(
                      !selectedSectionIds.includes(key),
                      key,
                    )
                  }
                  loading={loadingList || isPending}
                />
              );
            })}
          </Flex>
        ) : null}
        <ShowCaseFlex className="show-case-flex" vertical gap={32}>
          {sectionsFiltered.map((section) =>
            section.items.length ? (
              <Flex vertical gap={16} key={section.id}>
                <ProductTypeTitleFlex id={`section-${section.id}`}>
                  <ProductTypeTitle level={2}>{section.label}</ProductTypeTitle>
                </ProductTypeTitleFlex>

                <Carousel
                  arrows={
                    isXs
                      ? section.items.length > 4
                      : isMdDown
                        ? section.items.length > 4
                        : isLg
                          ? section.items.length > 6
                          : section.items.length > 8
                  }
                  dots={
                    isXs
                      ? section.items.length > 4
                      : isMdDown
                        ? section.items.length > 4
                        : isLg
                          ? section.items.length > 6
                          : section.items.length > 8
                  }
                  draggable={isLgDown}
                  infinite={false}
                  className="showcase-carousel"
                >
                  {Array.from({
                    length: Math.ceil(
                      isXs
                        ? section.items.length / 4
                        : isMdDown
                          ? section.items.length / 4
                          : isLg
                            ? section.items.length / 6
                            : section.items.length / 8,
                    ),
                  }).map((_, index) => {
                    const start = isXs
                      ? index * 4
                      : isMdDown
                        ? index * 4
                        : isLg
                          ? index * 6
                          : index * 8;
                    const productsChunk = section.items.slice(
                      start,
                      isXs
                        ? start + 4
                        : isMdDown
                          ? start + 4
                          : isLg
                            ? start + 6
                            : start + 8,
                    );
                    let itemPosition: number | null = null;

                    return (
                      <div key={index}>
                        <Row
                          gutter={isXs ? [4, 8] : [16, 16]}
                          style={{
                            padding: isXs ? '0 36px 48px 36px' : '0 48px 48px',
                          }}
                        >
                          {productsChunk.map((product) => {
                            if (isXs && itemPosition === null) {
                              itemPosition = 0;
                            } else if (
                              isXs &&
                              itemPosition !== null &&
                              itemPosition > 3
                            ) {
                              itemPosition = 0;
                            } else if (isXs && itemPosition !== null) {
                              itemPosition += 1;
                            }

                            return (
                              <Col
                                xl={6}
                                lg={8}
                                md={12}
                                sm={12}
                                xs={12}
                                key={product.id}
                                style={{ display: 'flex' }}
                              >
                                <ProductCard
                                  product={product}
                                  position={itemPosition}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                      </div>
                    );
                  })}
                </Carousel>
              </Flex>
            ) : null,
          )}
          {(loadingList || isPending) && <ContainerLoading />}
        </ShowCaseFlex>
      </Flex>
    </ShowcaseContainerFlex>
  );
};

export default Showcase;
