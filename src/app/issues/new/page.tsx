'use client'

import { TextField } from "@radix-ui/themes"
import { Button } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form'

interface IssueForm {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>() // -> register: { name, onChange, onBlur, ref }
  

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit((data) => console.log(data))}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>

      <Controller name="description" control={control} render={({ field }) => 
        <SimpleMDE placeholder="Description" { ...field }  />
      } />

      <Button>Submit</Button>
    </form>
  )
}

export default NewIssuePage
