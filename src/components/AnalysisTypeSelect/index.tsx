import { Box } from '@/components/Box';
import { MultiSelect, type MultiSelectItem } from '@/components/MultiSelect';
import {
  getPersonAnalysisItems,
  getRegionAnalysisItems,
} from '@/constants/analysis';
import { estadosSelectItems } from '@/constants/estados';
import {
  PersonAnalysisType,
  PersonRegionType,
  State,
  type AnalysisType,
  type FeatureFlags,
  type RegionPersonAnalysis,
} from '@/models';
import type { SelectItem } from '@/types/select';
import { memo, useMemo } from 'react';

interface AnalysisTypeSelectProps {
  featureFlags: FeatureFlags;
  analysisType: AnalysisType;
  personAnalysis: RegionPersonAnalysis[];
  onChangePersonAnalysis: (
    items:
      | RegionPersonAnalysis[]
      | ((items: RegionPersonAnalysis[]) => RegionPersonAnalysis[]),
  ) => void;
}

interface AnalysisTypeSelectItemProps {
  item: SelectItem;
  featureFlags: FeatureFlags;
  personAnalysis: RegionPersonAnalysis | undefined;
  onChangePersonAnalysis: (
    items:
      | RegionPersonAnalysis[]
      | ((items: RegionPersonAnalysis[]) => RegionPersonAnalysis[]),
  ) => void;
}

export const statusWithoutOptions = [
  PersonRegionType.BASIC_DATA,
  PersonRegionType.CNH_BASIC,
  PersonRegionType.CNH_STATUS,
  PersonRegionType.PROCESS,
];

export const statusWithStates = [
  PersonRegionType.NATIONAL_STATES,
  PersonRegionType.STATES,
];

const minWidthByRegionType = {
  [PersonRegionType.STATES]: 'max-w-44 w-full',
  [PersonRegionType.NATIONAL]: 'max-w-40 w-full',
  [PersonRegionType.NATIONAL_STATES]: 'max-w-56 w-full',
  [PersonRegionType.NATIONAL_DB]: '',
  [PersonRegionType.BASIC_DATA]: 'max-w-40 w-full',
  [PersonRegionType.CNH_BASIC]: 'max-w-40 w-full',
  [PersonRegionType.CNH_STATUS]: 'max-w-40 w-full',
  [PersonRegionType.PROCESS]: '',
};

export const AnalysisTypeSelectItem: React.FC<AnalysisTypeSelectItemProps> =
  memo(({ item, featureFlags, personAnalysis, onChangePersonAnalysis }) => {
    const selectStates = useMemo(
      () =>
        personAnalysis?.regions.map((region) => ({
          label: region,
          value: region,
        })) ?? [],
      [personAnalysis],
    );

    const setRegionType = (values: RegionPersonAnalysis[]) => {
      if (personAnalysis?.region_type) {
        return values.filter(
          (value) => value.region_type !== personAnalysis.region_type,
        );
      }

      return values.concat([
        {
          region_type: item.value as PersonRegionType,
          analysis_type: [],
          regions: [],
        },
      ]);
    };

    const setAnalysisType =
      (analysisType: PersonAnalysisType) => (values: RegionPersonAnalysis[]) =>
        values.map((value) => {
          if (value.region_type !== personAnalysis?.region_type) {
            return value;
          }

          if (value.analysis_type.includes(analysisType)) {
            return {
              ...value,
              analysis_type: value.analysis_type.filter(
                (item) => item !== analysisType,
              ),
            };
          }

          return {
            ...value,
            analysis_type: value.analysis_type.concat(analysisType),
          };
        });

    const setStates = (ufs: State[]) => (values: RegionPersonAnalysis[]) =>
      values.map((value) => {
        if (value.region_type !== personAnalysis?.region_type) {
          return value;
        }

        return { ...value, regions: ufs };
      });

    const onChangeStates = (values: MultiSelectItem) =>
      onChangePersonAnalysis(
        setStates(values.map((item) => item.value) as State[]),
      );

    const renderInnerOptions = () => {
      if (
        statusWithoutOptions.includes(item.value as PersonRegionType) ||
        !personAnalysis?.region_type
      )
        return null;

      return (
        <div className="mb-3 mt-1 flex max-w-[10rem] flex-col 2xl:mb-0">
          {getPersonAnalysisItems(personAnalysis.region_type, featureFlags).map(
            (radioItem) => (
              <button
                type="button"
                key={radioItem.value}
                onClick={() =>
                  onChangePersonAnalysis(
                    setAnalysisType(radioItem.value as PersonAnalysisType),
                  )
                }
                className="flex items-center gap-2 py-1"
              >
                {personAnalysis.analysis_type.includes(
                  radioItem.value as PersonAnalysisType,
                ) ? (
                  <span className="min-h-4 min-w-4 bg-link" />
                ) : (
                  <span className="min-h-4 min-w-4 border border-placeholder" />
                )}
                <span className="text-left text-sm font-medium text-placeholder">
                  {radioItem.label}
                </span>
              </button>
            ),
          )}
        </div>
      );
    };

    const renderStates = () => {
      if (
        !personAnalysis?.region_type ||
        !statusWithStates.includes(personAnalysis?.region_type)
      ) {
        return null;
      }

      const isMulti = personAnalysis.region_type === PersonRegionType.STATES;

      return (
        <div className="mb-4 max-w-[15rem] 2xl:mb-0 2xl:mt-3">
          <label
            className="mb-1 block text-[0.8rem] font-semibold"
            htmlFor="region_states"
          >
            <span className="text-error">*</span>
            {isMulti ? 'Estados' : 'Estado'}
          </label>
          <MultiSelect
            isMulti={isMulti}
            placeholder={
              isMulti ? 'Selecione os estados' : 'Selecione o estado'
            }
            options={estadosSelectItems as never}
            value={selectStates}
            onChange={onChangeStates}
          />
        </div>
      );
    };

    return (
      <div className={minWidthByRegionType[item.value as PersonRegionType]}>
        <button
          type="button"
          key={item.value}
          onClick={() => onChangePersonAnalysis(setRegionType)}
          className="flex gap-2 py-1"
        >
          {personAnalysis?.region_type ? (
            <span className="mt-[0.12rem] h-4 w-4 bg-link" />
          ) : (
            <span className="mt-[0.12rem] h-4 w-4 border border-placeholder" />
          )}
          <span className="text-left text-sm font-medium text-placeholder">
            {item.label}
          </span>
        </button>
        {renderInnerOptions()}
        {renderStates()}
      </div>
    );
  });

AnalysisTypeSelectItem.displayName = 'AnalysisTypeSelectItem';

export const AnalysisTypeSelect: React.FC<AnalysisTypeSelectProps> = ({
  personAnalysis,
  featureFlags,
  analysisType,
  onChangePersonAnalysis,
}) => {
  const items = getRegionAnalysisItems(analysisType, featureFlags);

  return (
    <Box spacing="sm" containerClassName="mb-2">
      <h2 className="text-sm font-bold text-dark">
        Selecione o tipo de análise de pessoa
      </h2>
      <small className="mt-0.5 block text-placeholder/80">
        Você deve selecionar ao menos uma opção abaixo
      </small>
      <div className="mt-3 flex flex-col gap-2 2xl:flex-row 2xl:gap-4">
        {items.map((item) => (
          <AnalysisTypeSelectItem
            featureFlags={featureFlags}
            key={item.value}
            item={item}
            onChangePersonAnalysis={onChangePersonAnalysis}
            personAnalysis={personAnalysis.find(
              (personAnalysis) => personAnalysis.region_type === item.value,
            )}
          />
        ))}
      </div>
    </Box>
  );
};
