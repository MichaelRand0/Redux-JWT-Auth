import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { object } from 'yup'

interface Settings {
  name: string
  label?: string
}

export function useSearch(settings: Settings) {
  const [name, setName] = useState(settings.name)
  const [label, setLabel] = useState(settings?.label ?? '')
  const [schema, setSchema] = useState(object({}))
  const [values, setValues] = useState<any>()
  const {
    register,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    const subscription = watch(() => {
      setValues(getValues())
    })
    return () => subscription.unsubscribe()
  }, [watch])
  return {
    name,
    setName,
    label,
    setLabel,
    schema,
    setSchema,
    registerData: {
      ...register(name),
      label,
    },
    watch,
    values,
  }
}
