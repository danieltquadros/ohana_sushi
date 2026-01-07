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
import { Product } from '@/interfaces/Product';
import { ChangeEvent, useEffect, useState, useTransition } from 'react';
import ProductCard from '../ProductCard';
import useResponsive from '@/hooks/useResponsive';
import Cart from '../Cart';
import FilterDrawer from './components/FilterDrawer';
import ButtonLink from '../ButtonLink';
import { ProductListByType } from './interfaces/ProductListByType';
import ContainerLoading from '../Loadings/ContainerLoading';
import SwitchFilter from '../SwitchFilter';
import useProducts from '@/hooks/useProducts';
import './styles.css';

interface ShowcaseProps {
  isNavigating: boolean;
  setIsNavigating: React.Dispatch<React.SetStateAction<boolean>>;
}

const Showcase = ({ isNavigating, setIsNavigating }: ShowcaseProps) => {
  const { isXxl, isLg, isLgDown, isMdDown, isXs } = useResponsive();
  const {
    products: productList,
    loading: loadingProducts,
    error,
  } = useProducts();
  const [productListByType, setProductListByType] = useState<
    ProductListByType[]
  >([]);
  const [productListByTypeFiltered, setProductListByTypeFiltered] = useState<
    ProductListByType[]
  >([]);
  const [selectedProductType, setSelectedProductType] = useState<string[]>([
    'ALL',
  ]);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filterProductsByType = () => {
    let newComboList: Product[] = [];
    let newPortionList: Product[] = [];
    let newPokesList: Product[] = [];
    let newYakisobaList: Product[] = [];
    let newMegaHotList: Product[] = [];
    let newTemakiList: Product[] = [];
    let newItemList: Product[] = [];
    let newUramakisList: Product[] = [];
    let newHotsList: Product[] = [];
    let newHossosList: Product[] = [];
    let newDrinkList: Product[] = [];
    let newOtherList: Product[] = [];

    productList.map((prod) => {
      switch (prod.type) {
        case 'COMBO':
          newComboList = [...newComboList, prod];
          break;
        case 'PORTION':
          newPortionList = [...newPortionList, prod];
          break;
        case 'POKES':
          newPokesList = [...newPokesList, prod];
          break;
        case 'YAKISOBA':
          newYakisobaList = [...newYakisobaList, prod];
          break;
        case 'MEGA_HOT':
          newMegaHotList = [...newMegaHotList, prod];
          break;
        case 'TEMAKI':
          newTemakiList = [...newTemakiList, prod];
          break;
        case 'ITEM':
          newItemList = [...newItemList, prod];
          break;
        case 'URAMAKIS':
          newUramakisList = [...newUramakisList, prod];
          break;
        case 'HOTS':
          newHotsList = [...newHotsList, prod];
          break;
        case 'HOSSOS':
          newHossosList = [...newHossosList, prod];
          break;
        case 'DRINK':
          newDrinkList = [...newDrinkList, prod];
          break;
        case 'OTHER':
          newOtherList = [...newOtherList, prod];
          break;
        default:
          break;
      }

      let newProductListByType: ProductListByType[] = [];
      if (newComboList.length)
        newProductListByType = [
          {
            id: 1,
            type: 'COMBO',
            typeName: 'Combinados',
            productLists: newComboList,
            order: 1,
          },
        ];
      if (newPortionList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 2,
            type: 'PORTION',
            typeName: 'Porções',
            productLists: newPortionList,
            order: 2,
          },
        ];
      if (newPokesList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 3,
            type: 'POKES',
            typeName: 'Pokes',
            productLists: newPokesList,
            order: 3,
          },
        ];
      if (newYakisobaList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 4,
            type: 'YAKISOBA',
            typeName: 'Yakisobas',
            productLists: newYakisobaList,
            order: 4,
          },
        ];
      if (newMegaHotList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 5,
            type: 'MEGA_HOT',
            typeName: 'Mega Hots',
            productLists: newMegaHotList,
            order: 5,
          },
        ];
      if (newTemakiList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 6,
            type: 'TEMAKI',
            typeName: 'Temakis',
            productLists: newTemakiList,
            order: 6,
          },
        ];
      if (newItemList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 7,
            type: 'ITEM',
            typeName: 'Unidades',
            productLists: newItemList,
            order: 7,
          },
        ];
      if (newUramakisList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 8,
            type: 'URAMAKIS',
            typeName: 'Uramakis',
            productLists: newUramakisList,
            order: 8,
          },
        ];
      if (newHotsList.length) {
        newProductListByType = [
          ...newProductListByType,
          {
            id: 9,
            type: 'HOTS',
            typeName: 'Hots',
            productLists: newHotsList,
            order: 9,
          },
        ];
      }
      if (newHossosList.length) {
        newProductListByType = [
          ...newProductListByType,
          {
            id: 10,
            type: 'HOSSOS',
            typeName: 'Hossos',
            productLists: newHossosList,
            order: 10,
          },
        ];
      }
      if (newDrinkList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 11,
            type: 'DRINK',
            typeName: 'Bebidas',
            productLists: newDrinkList,
            order: 11,
          },
        ];
      if (newOtherList.length)
        newProductListByType = [
          ...newProductListByType,
          {
            id: 12,
            type: 'OTHER',
            typeName: 'Outros',
            productLists: newOtherList,
            order: 12,
          },
        ];

      newProductListByType.sort((a, b) => a.order - b.order);

      setProductListByType(newProductListByType);
      setProductListByTypeFiltered(newProductListByType);
    });
  };

  const handleProductFilter = (e: boolean, productType: ProductType) => {
    setLoadingList(true);

    startTransition(() => {
      if (productType === 'ALL' || (selectedProductType.length === 1 && !e)) {
        setSelectedProductType(['ALL']);
        setProductListByTypeFiltered(productListByType);
        setLoadingList(false);
        return;
      }

      const newSelectedProductType = e
        ? [...selectedProductType.filter((type) => type !== 'ALL'), productType]
        : selectedProductType.filter((type) => type !== productType);

      setSelectedProductType(newSelectedProductType);

      const filteredProductListByType = productListByType.map((productType) => {
        if (newSelectedProductType.includes(productType.type)) {
          return productType;
        }
        return { ...productType, productLists: [] };
      });

      setProductListByTypeFiltered(filteredProductListByType);
      setLoadingList(false);
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredProductListByType = productListByType.map((productType) => {
      const filteredProducts = productType.productLists.filter(
        (product) =>
          product.title.toLowerCase().includes(searchValue) ||
          product.ingredientList.some((ingredient) =>
            ingredient.name.toLowerCase().includes(searchValue),
          ),
      );
      return { ...productType, productLists: filteredProducts };
    });
    setProductListByTypeFiltered(filteredProductListByType);
  };

  useEffect(() => {
    if (productList.length) filterProductsByType();
  }, [productList]);

  if (loadingProducts) {
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
          Erro ao carregar produtos. Tente novamente mais tarde.
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
                selectedProductType.includes('ALL')
                  ? ['Todos']
                  : productListByType
                      .filter((productType) =>
                        selectedProductType.includes(productType.type),
                      )
                      .map((productType) => productType.typeName)
              }
              onDeselect={(value) =>
                handleProductFilter(
                  false,
                  productListByType.find((type) => type.typeName === value)
                    ?.type || 'ALL',
                )
              }
              onClear={() => handleProductFilter(true, 'ALL')}
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
              selectedProductType={selectedProductType}
              handleProductFilter={handleProductFilter}
              productListByType={productListByType}
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
              selectedProductType={selectedProductType.includes('ALL')}
              handleProductFilter={() =>
                handleProductFilter(selectedProductType.includes('ALL'), 'ALL')
              }
              loading={loadingList || isPending}
              defaultChecked={true}
            />
            {productListByType.map((productType) => (
              <SwitchFilter
                label={productType.typeName}
                selectedProductType={selectedProductType.includes(
                  productType.type,
                )}
                handleProductFilter={() =>
                  handleProductFilter(
                    !selectedProductType.includes(productType.type),
                    productType.type,
                  )
                }
                loading={loadingList || isPending}
              />
            ))}
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
                : '1524px', // '1428px', // '1376px',
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
              selectedProductType={selectedProductType.includes('ALL')}
              handleProductFilter={() =>
                handleProductFilter(selectedProductType.includes('ALL'), 'ALL')
              }
              loading={loadingList || isPending}
              defaultChecked={true}
            />
            {productListByType.map((productType) => (
              <SwitchFilter
                label={productType.typeName}
                selectedProductType={selectedProductType.includes(
                  productType.type,
                )}
                handleProductFilter={() =>
                  handleProductFilter(
                    !selectedProductType.includes(productType.type),
                    productType.type,
                  )
                }
                loading={loadingList || isPending}
              />
            ))}
          </Flex>
        ) : null}
        <ShowCaseFlex className="show-case-flex" vertical gap={32}>
          {productListByTypeFiltered.map((productByType) =>
            productByType.productLists.length ? (
              <Flex vertical gap={16} key={productByType.id}>
                {productByType.productLists.length ? (
                  <ProductTypeTitleFlex id={productByType.type}>
                    <ProductTypeTitle level={2}>
                      {productByType.typeName}
                    </ProductTypeTitle>
                  </ProductTypeTitleFlex>
                ) : null}

                <Carousel
                  arrows={
                    isXs
                      ? productByType.productLists.length > 4
                      : isMdDown
                        ? productByType.productLists.length > 4
                        : isLg
                          ? productByType.productLists.length > 6
                          : productByType.productLists.length > 8
                  }
                  dots={
                    isXs
                      ? productByType.productLists.length > 4
                      : isMdDown
                        ? productByType.productLists.length > 4
                        : isLg
                          ? productByType.productLists.length > 6
                          : productByType.productLists.length > 8
                  }
                  draggable={isLgDown}
                  infinite={false}
                  className="showcase-carousel"
                >
                  {Array.from({
                    length: Math.ceil(
                      isXs
                        ? productByType.productLists.length / 4
                        : isMdDown
                          ? productByType.productLists.length / 4
                          : isLg
                            ? productByType.productLists.length / 6
                            : productByType.productLists.length / 8,
                    ),
                  }).map((_, index) => {
                    const start = isXs
                      ? index * 4
                      : isMdDown
                        ? index * 4
                        : isLg
                          ? index * 6
                          : index * 8;
                    const productsChunk = productByType.productLists.slice(
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
