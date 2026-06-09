import { Drawer, Flex } from 'antd';
import { MenuSection } from '@/interfaces/MenuSection';
import SwitchFilter from '@/components/SwitchFilter';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedSectionIds: string[];
  handleSectionFilter: (active: boolean, sectionKey: string) => void;
  sections: MenuSection[];
  loading?: boolean;
}

const ALL_SECTIONS = 'ALL';

const FilterDrawer = ({
  open,
  onClose,
  selectedSectionIds,
  handleSectionFilter,
  sections,
  loading,
}: FilterDrawerProps) => {
  return (
    <Drawer
      title="Filtros"
      closable={{ 'aria-label': 'Close Button' }}
      onClose={onClose}
      open={open}
      width={280}
    >
      <Flex gap={8} vertical>
        <SwitchFilter
          label="Todos"
          selectedProductType={selectedSectionIds.includes(ALL_SECTIONS)}
          handleProductFilter={() =>
            handleSectionFilter(
              selectedSectionIds.includes(ALL_SECTIONS),
              ALL_SECTIONS,
            )
          }
          loading={loading}
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
                handleSectionFilter(!selectedSectionIds.includes(key), key)
              }
              loading={loading}
            />
          );
        })}
      </Flex>
    </Drawer>
  );
};

export default FilterDrawer;
