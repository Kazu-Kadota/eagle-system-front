import React, { memo } from 'react'
import ReactSelect from 'react-select'
import { TimesIcon } from 'src/assets/icons'
import { RadioGroupItem } from 'src/components'
import {
  PersonAnalysisType,
  PersonRegionType,
  RegionPersonAnalysis,
  State,
} from 'src/models'
import {
  personAnalysisItems,
  regionAnalysisItems,
  regionAnalysisItemsWithCNH,
} from '../../constants/analysis'
import { estadosSelectItems } from '../../constants/estados'

interface AnalysisTypeSelectProps {
  personAnalysis: RegionPersonAnalysis[]
  showCNHStatus?: boolean
  onChangePersonAnalysis: (
    items:
      | RegionPersonAnalysis[]
      | ((items: RegionPersonAnalysis[]) => RegionPersonAnalysis[]),
  ) => void
}

interface AnalysisTypeSelectItemProps {
  item: RadioGroupItem
  personAnalysis: RegionPersonAnalysis | undefined
  onChangePersonAnalysis: (
    items:
      | RegionPersonAnalysis[]
      | ((items: RegionPersonAnalysis[]) => RegionPersonAnalysis[]),
  ) => void
}

export const AnalysisTypeSelectItem: React.FC<AnalysisTypeSelectItemProps> =
  memo(({ item, personAnalysis, onChangePersonAnalysis }) => {
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
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="flex h-[1.7rem] w-[1.7rem] items-center justify-center rounded-sm border-[1px] border-primary">
            {personAnalysis?.region_type && (
              <TimesIcon className="w-4 stroke-placeholder" />
            )}
          </span>
          <span className="border-border flex flex-1 items-center gap-2 rounded-md border-[1px] px-2 py-[0.4rem] sm:flex-none">
            <span className="text-sm font-bold text-primary">{item.label}</span>
          </span>
        </button>
        {personAnalysis?.region_type &&
          personAnalysis.region_type !== PersonRegionType.CNH_STATUS && (
            <div className="mt-2 flex flex-col gap-2">
              {personAnalysisItems.map((radioItem) => (
                <button
                  type="button"
                  key={radioItem.value}
                  onClick={() =>
                    onChangePersonAnalysis(
                      setAnalysisType(radioItem.value as PersonAnalysisType),
                    )
                  }
                  className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                  <span className="flex h-[1.7rem] w-[1.7rem] items-center justify-center rounded-sm border-[1px] border-primary">
                    {personAnalysis.analysis_type.includes(
                      radioItem.value as PersonAnalysisType,
                    ) && <TimesIcon className="w-4 stroke-placeholder" />}
                  </span>
                  <span className="border-border flex flex-1 items-center gap-2 rounded-md border-[1px] px-2 py-[0.4rem] sm:flex-none">
                    <span className="text-sm font-bold text-primary">
                      {radioItem.label}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        {personAnalysis?.region_type === PersonRegionType.STATES && (
          <div className="mt-4">
            <label
              className="mb-2 block text-sm font-semibold"
              htmlFor="region_states"
            >
              <span className="text-error">*</span>
              Estados da ánalise estadual
            </label>
            <ReactSelect
              isMulti
              inputId="region_states"
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
  showCNHStatus,
  onChangePersonAnalysis,
}) => {
  const items = showCNHStatus ? regionAnalysisItemsWithCNH : regionAnalysisItems

  return (
    <div>
      <h2 className="flex items-center gap-2 text-base font-bold text-primary">
        Selecione o tipo de análise de pessoa
      </h2>
      <small className="mt-2 block text-primary/60">
        Você deve selecionar ao menos uma opção abaixo
      </small>
      <div className="mt-4 flex max-w-3xl flex-col gap-[0.65rem] md:flex-row">
        {items.map((item) => (
          <AnalysisTypeSelectItem
            key={item.value}
            item={item}
            onChangePersonAnalysis={onChangePersonAnalysis}
            personAnalysis={personAnalysis.find(
              (personAnalysis) => personAnalysis.region_type === item.value,
            )}
          />
        ))}
      </div>
    </div>
  )
}
