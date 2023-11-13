import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCompanies } from 'src/features/auth'
import { UserType, VehicleAnalysis } from 'src/models'
import { useAuthStore } from 'src/store/auth'
import { getErrorMsg } from 'src/utils/errors'
import { hasUserType } from 'src/utils/userType'
import { searchVehicleAnalysis } from '../../services/search'
import {
  AnalysisVehicleSearchSchema,
  analysisVehicleSearchSchema,
} from './schema'
import { SearchVehicleAnalysisUI } from './ui'

export const SearchVehicleAnalysisPage = () => {
  const { user } = useAuthStore()

  const { control, handleSubmit } = useForm<AnalysisVehicleSearchSchema>({
    resolver: zodResolver(analysisVehicleSearchSchema),
    defaultValues: {
      plateSearch: '',
      plateStateSearch: '',
      companyNameSearch: '',
    },
  })

  const [isLoading, setLoading] = useState(false)
  const [items, setItems] = useState<VehicleAnalysis[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<VehicleAnalysis | null>(null)

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user.user_type, UserType.ADMIN, UserType.OPERATOR),
  })

  const onSubmit = async (data: AnalysisVehicleSearchSchema) => {
    try {
      setLoading(true)

      const response = await searchVehicleAnalysis({
        plate: data.plateSearch,
        plate_state: data.plateStateSearch,
        company_name: data.companyNameSearch || undefined,
      })

      const analysis = response.data ?? []

      setItems(analysis)
      setSelectedItem(analysis.length === 1 ? analysis[0] : null)
    } catch (error) {
      toast.error(getErrorMsg(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <SearchVehicleAnalysisUI
      control={control}
      isLoading={isLoading}
      userType={user.user_type}
      companiesSelectItems={companiesSelectItems}
      companiesLoading={companiesLoading}
      items={items}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      onSearchSubmit={handleSubmit(onSubmit)}
    />
  )
}
