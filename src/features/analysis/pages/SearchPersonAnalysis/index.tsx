import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCompanies } from 'src/features/auth'
import { PersonAnalysis, UserType } from 'src/models'
import { useAuthStore } from 'src/store/auth'
import { getErrorMsg } from 'src/utils/errors'
import { hasUserType } from 'src/utils/userType'
import { searchPersonAnalysis } from '../../services/search'
import {
  AnalysisPersonSearchSchema,
  analysisPersonSearchSchema,
} from './schema'
import { SearchPersonAnalysisUI } from './ui'

export const SearchPersonAnalysisPage = () => {
  const { user } = useAuthStore()

  const { control, handleSubmit } = useForm<AnalysisPersonSearchSchema>({
    resolver: zodResolver(analysisPersonSearchSchema),
    defaultValues: { searchDocument: '', companyNameSearch: '' },
  })

  const [isLoading, setLoading] = useState(false)
  const [items, setItems] = useState<PersonAnalysis[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<PersonAnalysis | null>(null)

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user.user_type, UserType.ADMIN, UserType.OPERATOR),
  })

  const onSubmit = async (data: AnalysisPersonSearchSchema) => {
    try {
      setLoading(true)

      const response = await searchPersonAnalysis({
        document: data.searchDocument,
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
    <SearchPersonAnalysisUI
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
