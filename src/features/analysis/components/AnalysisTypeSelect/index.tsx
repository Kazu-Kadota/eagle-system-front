import React, { memo } from 'react'
import { Box, MultiSelect } from 'src/components'
import {
  PersonAnalysisType,
  PersonRegionType,
  RegionPersonAnalysis,
  State,
} from 'src/models'
import {
  getPersonAnalysisItems,
  regionAnalysisItems,
  regionAnalysisItemsWithCNH,
} from '../../constants/analysis'
import { estadosSelectItems } from '../../constants/estados'
import { SelectItem } from 'src/types/select'

interface AnalysisTypeSelectProps {
  isDbEnabled: boolean
  personAnalysis: RegionPersonAnalysis[]
  showCNHStatus?: boolean
  onChangePersonAnalysis: (
    items:
      | RegionPersonAnalysis[]
      | ((items: RegionPersonAnalysis[]) => RegionPersonAnalysis[]),
  ) => void
}

interface AnalysisTypeSelectItemProps {
  item: SelectItem
  isDbEnabled: boolean
  personAnalysis: RegionPersonAnalysis | undefined
  onChangePersonAnalysis: (
    items:
      | RegionPersonAnalysis[]
      | ((items: RegionPersonAnalysis[]) => RegionPersonAnalysis[]),
  ) => void
}

export const AnalysisTypeSelectItem: React.FC<AnalysisTypeSelectItemProps> =
  memo(({ item, isDbEnabled, personAnalysis, onChangePersonAnalysis }) => {
    const setRegionType = (values: RegionPersonAnalysis[]) => {
      if (personAnalysis?.region_type) {
        return values.filter(
          (value) => value.region_type !== personAnalysis.region_type,
        )
      }

      return values.concat([
        {
          region_type: item.value as PersonRegionType,
          analysis_type: [],
          regions: [],
        },
      ])
    }

    const setAnalysisType =
      (analysisType: PersonAnalysisType) => (values: RegionPersonAnalysis[]) =>
        values.map((value) => {
          if (value.region_type !== personAnalysis?.region_type) {
            return value
          }

          if (value.analysis_type.includes(analysisType)) {
            return {
              ...value,
              analysis_type: value.analysis_type.filter(
                (item) => item !== analysisType,
              ),
            }
          }

          return {
            ...value,
            analysis_type: value.analysis_type.concat(analysisType),
          }
        })

    const setStates = (ufs: State[]) => (values: RegionPersonAnalysis[]) =>
      values.map((value) => {
        if (value.region_type !== personAnalysis?.region_type) {
          return value
        }

        return { ...value, regions: ufs }
      })

    return (
      <div className="flex-1">
        <button
          type="button"
          key={item.value}
          onClick={() => onChangePersonAnalysis(setRegionType)}
          className="flex items-center gap-2 py-1"
        >
          {personAnalysis?.region_type ? (
            <span className="h-4 w-4 bg-link" />
          ) : (
            <span className="h-4 w-4 border border-placeholder" />
          )}
          <span className="text-sm font-medium text-placeholder">
            {item.label}
          </span>
        </button>
        {personAnalysis?.region_type &&
          personAnalysis.region_type !== PersonRegionType.CNH_STATUS && (
            <div className="mt-1 flex flex-col">
              {getPersonAnalysisItems(
                personAnalysis.region_type,
                isDbEnabled,
              ).map((radioItem) => (
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
                    <span className="h-4 w-4 bg-link" />
                  ) : (
                    <span className="h-4 w-4 border border-placeholder" />
                  )}
                  <span className="text-sm font-medium text-placeholder">
                    {radioItem.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        {personAnalysis?.region_type === PersonRegionType.STATES && (
          <div className="mt-3 max-w-[15rem]">
            <label
              className="mb-1 block text-sm font-semibold"
              htmlFor="region_states"
            >
              <span className="text-error">*</span>
              Estados da ánalise estadual
            </label>
            <MultiSelect
              placeholder="Selecione os estados"
              options={estadosSelectItems as never}
              value={personAnalysis.regions.map((region) => ({
                label: region,
                value: region,
              }))}
              onChange={(values) =>
                onChangePersonAnalysis(
                  setStates(values.map((item) => item.value) as State[]),
                )
              }
            />
          </div>
        )}
      </div>
    )
  })

AnalysisTypeSelectItem.displayName = 'AnalysisTypeSelectItem'

export const AnalysisTypeSelect: React.FC<AnalysisTypeSelectProps> = ({
  personAnalysis,
  isDbEnabled,
  showCNHStatus,
  onChangePersonAnalysis,
}) => {
  const items = showCNHStatus ? regionAnalysisItemsWithCNH : regionAnalysisItems

  return (
    <Box spacing="sm" containerClassName="mb-2">
      <h2 className="text-sm font-bold text-dark">
        Selecione o tipo de análise de pessoa
      </h2>
      <small className="mt-0.5 block text-placeholder/80">
        Você deve selecionar ao menos uma opção abaixo
      </small>
      <div className="mt-3 flex max-w-3xl flex-col gap-[0.65rem] md:flex-row">
        {items.map((item) => (
          <AnalysisTypeSelectItem
            isDbEnabled={isDbEnabled}
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
  )
}
