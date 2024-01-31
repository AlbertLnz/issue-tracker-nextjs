'use client'

import { Callout, Text, TextField } from "@radix-ui/themes"
import { Button } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from 'zod'
import ErrorMessage from "@/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  }) // -> register: { name, onChange, onBlur, ref }
  const router = useRouter()
  const [error, setError] = useState('');

  return (
    <div className="max-w-xl space-y-3">
      {error &&
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form className="max-w-xl space-y-3" onSubmit={handleSubmit( async (data) => {
        try {
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          setError('An unexpected error ocurred')
        }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>

        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>} {/* Managing the possibility of null here */}

        <Controller name="description" control={control} render={({ field }) => 
          <SimpleMDE placeholder="Description" { ...field }  />
        } />

        <ErrorMessage>{errors.description?.message}</ErrorMessage> {/* Managing the possibility of null in the ErrorMessage */}

        <Button>Submit</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
