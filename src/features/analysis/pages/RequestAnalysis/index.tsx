import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCompanies, useMyCompany } from 'src/features/auth'
import {
  AnalysisType,
  PersonRegionType,
  RegionPersonAnalysis,
  UserType,
} from 'src/models'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'
import { useModal } from 'src/store/modal'
import { getErrorMsg } from 'src/utils/errors'
import { submitFormPromise } from 'src/utils/form'
import { hasUserType } from 'src/utils/userType'
import {
  requestAnalysisCombo,
  requestAnalysisPerson,
  requestAnalysisPlateHistory,
  requestAnalysisSecondDriver,
  requestAnalysisVehicle,
} from '../../services/request'
import {
  AnalysisArrayVehicleSchema,
  AnalysisPersonSchema,
  PlateHistorySchema,
  SecondDriverSchema,
  analysisArrayVehicleSchema,
  analysisPersonSchema,
  plateHistorySchema,
  secondDriverSchema,
} from './schema'
import { RequestAnalysisUI } from './ui'
import {
  defaultPerson,
  defaultPlateHistory,
  defaultVehicle,
  defaultSecondDriver,
  preparePersonAnalysis,
  preparePersonData,
  prepareVehicleData,
  validatePersonAnalysis,
} from './utils'

export type RequestAnalysisParams = {
  analysisType: AnalysisType
  regionType?: PersonRegionType
}

export function RequestAnalysisPage() {
  const navigate = useNavigate()

  const modal = useModal()
  const { user } = useAuthStore()

  const [searchParams] = useSearchParams()
  const analysisTypeFromUrl = searchParams.get('analysisType') as AnalysisType
  const regionTypeFromUrl = searchParams.get('regionType') as PersonRegionType

  const [analysisType, setAnalysisType] = useState(
    analysisTypeFromUrl ?? AnalysisType.PERSON,
  )
  const [personAnalysis, setPersonAnalysis] = useState<RegionPersonAnalysis[]>(
    regionTypeFromUrl
      ? [{ region_type: regionTypeFromUrl, analysis_type: [], regions: [] }]
      : [],
  )
  const [vehicleAnalysisType, setVehicleAnalysisType] = useState(
    AnalysisType.VEHICLE,
  )

  const [analysisTypeLoading, setAnaysisTypeLoading] =
    useState<AnalysisType | null>(null)

  const formValuesOnlyForValidation = {
    userType: user.user_type,
    analysisType,
  }

  const { featureFlags, isLoading: myCompanyLoading } = useMyCompany()

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user.user_type, UserType.ADMIN),
  })

  const {
    control: controlPerson,
    reset: resetPerson,
    handleSubmit: handleSubmitPerson,
  } = useForm<AnalysisPersonSchema>({
    resolver: zodResolver(analysisPersonSchema),
    values: { ...defaultPerson, ...formValuesOnlyForValidation },
  })

  const {
    control: controlVehicle,
    reset: resetVehicle,
    handleSubmit: handleSubmitVehicle,
  } = useForm<AnalysisArrayVehicleSchema>({
    resolver: zodResolver(analysisArrayVehicleSchema),
    values: {
      vehicles: [{ ...defaultVehicle, ...formValuesOnlyForValidation }],
    },
  })

  const {
    fields: fieldsVehicle,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    name: 'vehicles',
    control: controlVehicle,
  })

  const {
    control: controlPlateHistory,
    reset: resetPlateHistory,
    handleSubmit: handleSubmitPlateHistory,
  } = useForm<PlateHistorySchema>({
    resolver: zodResolver(plateHistorySchema),
    values: { ...defaultPlateHistory, ...formValuesOnlyForValidation },
  })

  const {
    control: controlSecondDriver,
    reset: resetSecondDriver,
    handleSubmit: handleSubmitSecondDriver,
  } = useForm<SecondDriverSchema>({
    resolver: zodResolver(secondDriverSchema),
    values: { ...defaultSecondDriver, ...formValuesOnlyForValidation },
  })

  const handleClear = () => {
    resetPerson()
    resetVehicle()
    resetPlateHistory()
    resetSecondDriver()
    setPersonAnalysis([])
    setVehicleAnalysisType(AnalysisType.VEHICLE)
    setAnalysisType(analysisTypeFromUrl ?? AnalysisType.PERSON)
  }

  const onSuccessRequestAnalysis = (analysisType: AnalysisType) => {
    const goBackRoute = {
      [AnalysisType.PERSON]: RoutePaths.Analysis.PEOPLE_ANALYSIS_HOME,
      [AnalysisType.VEHICLE]: RoutePaths.Analysis.VEHICLE_ANALYSIS_HOME,
      [AnalysisType.COMBO]: RoutePaths.Analysis.PEOPLE_ANALYSIS_HOME,
      [AnalysisType.SECOND_DRIVER]: RoutePaths.Analysis.VEHICLE_ANALYSIS_HOME,
      [AnalysisType.VEHICLE_PLATE_HISTORY]:
        RoutePaths.Analysis.VEHICLE_ANALYSIS_HOME,
    }[analysisType]

    modal.open({
      title: 'Solicitação enviada!',
      buttons: [
        { children: 'Fazer outra solicitação', onClick: handleClear },
        {
          children: 'Ir para página inicial',
          theme: 'dark',
          onClick: () => navigate(goBackRoute),
        },
      ],
    })
  }

  const onErrorRequestAnalysis = (error: unknown) =>
    toast.error(
      getErrorMsg(
        error,
        'Não foi possível solicitar a análise, verfique os dados e tente novamente.',
      ),
    )

  const onRequestPersonAnalysis = async (data: AnalysisPersonSchema) => {
    try {
      const { isValid, msg } = validatePersonAnalysis(personAnalysis)

      if (!isValid) {
        toast.error(msg, { autoClose: 3500 })
        return
      }

      setAnaysisTypeLoading(AnalysisType.PERSON)

      await requestAnalysisPerson({
        person: preparePersonData(data),
        person_analysis: preparePersonAnalysis(
          personAnalysis,
          AnalysisType.PERSON,
        ),
      })

      onSuccessRequestAnalysis(AnalysisType.PERSON)
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const onRequestVehicleAnalysis = async ({
    vehicles: [data],
  }: AnalysisArrayVehicleSchema) => {
    try {
      setAnaysisTypeLoading(AnalysisType.VEHICLE)

      await requestAnalysisVehicle(prepareVehicleData(data))

      onSuccessRequestAnalysis(AnalysisType.VEHICLE)
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const onRequestComboAnalysis = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    const { isValid, msg } = validatePersonAnalysis(personAnalysis)

    if (!isValid) {
      toast.error(msg, { autoClose: 3500 })
      return
    }

    const [personData, vehiclesData] = await Promise.all([
      submitFormPromise(handleSubmitPerson),
      submitFormPromise(handleSubmitVehicle),
    ])

    if (!personData || !vehiclesData) {
      return
    }

    try {
      setAnaysisTypeLoading(AnalysisType.COMBO)

      await requestAnalysisCombo({
        combo_number: vehiclesData.vehicles.length,
        person: preparePersonData(personData),
        person_analysis: preparePersonAnalysis(
          personAnalysis,
          AnalysisType.COMBO,
        ),
        vehicles: vehiclesData.vehicles.map((data) =>
          prepareVehicleData(data, personData),
        ),
      })

      onSuccessRequestAnalysis(AnalysisType.COMBO)
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const onRequestPlateHistoryAnalysis = async (data: PlateHistorySchema) => {
    try {
      setAnaysisTypeLoading(AnalysisType.VEHICLE_PLATE_HISTORY)

      await requestAnalysisPlateHistory({
        plate: data.plate,
        plate_state: data.plate_state,
        company_name: data.company_name,
        owner_document: data.owner_document,
        owner_name: data.owner_name,
      })

      onSuccessRequestAnalysis(AnalysisType.VEHICLE_PLATE_HISTORY)
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const onRequestSecondDriverAnalysis = async (data: PlateHistorySchema) => {
    try {
      setAnaysisTypeLoading(AnalysisType.SECOND_DRIVER)

      await requestAnalysisSecondDriver({
        plate: data.plate,
        plate_state: data.plate_state,
        company_name: data.company_name,
        owner_document: data.owner_document,
        owner_name: data.owner_name,
      })

      onSuccessRequestAnalysis(AnalysisType.SECOND_DRIVER)
    } catch (error) {
      onErrorRequestAnalysis(error)
    } finally {
      setAnaysisTypeLoading(null)
    }
  }

  const handleAddVehicleForm = () =>
    appendVehicle({ ...defaultVehicle, ...formValuesOnlyForValidation })

  const handleChangePersonAnalysis = (analysis: RegionPersonAnalysis[]) => {
    setPersonAnalysis(analysis)
    setVehicleAnalysisType(AnalysisType.VEHICLE)
  }

  return (
    <RequestAnalysisUI
      isLoading={myCompanyLoading}
      isDbEnabled={featureFlags.database_access_consult}
      userType={user.user_type}
      analysisType={analysisType}
      personAnalysis={personAnalysis}
      vehicleAnalysisType={vehicleAnalysisType}
      analysisTypeLoading={analysisTypeLoading}
      fieldsVehicle={fieldsVehicle}
      companiesLoading={companiesLoading}
      companiesSelectItems={companiesSelectItems}
      controlPerson={controlPerson}
      controlVehicle={controlVehicle}
      controlPlateHistory={controlPlateHistory}
      controlSecondDriver={controlSecondDriver}
      onChangePersonAnalysis={handleChangePersonAnalysis}
      onChangeVehicleAnalysisType={setVehicleAnalysisType}
      onChangeAnalysisType={setAnalysisType}
      onRequestPersonAnalysis={handleSubmitPerson(onRequestPersonAnalysis)}
      onRequestComboAnalysis={onRequestComboAnalysis}
      onRequestVehicleAnalysis={handleSubmitVehicle(onRequestVehicleAnalysis)}
      onRequestPlateHistoryAnalysis={handleSubmitPlateHistory(
        onRequestPlateHistoryAnalysis,
      )}
      onRequestSecondDriverAnalysis={handleSubmitSecondDriver(
        onRequestSecondDriverAnalysis,
      )}
      addVehicleForm={handleAddVehicleForm}
      removeVehicleForm={removeVehicle}
    />
  )
}
