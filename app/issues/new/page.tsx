'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller, handleSubmit, formState } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchemas } from '@/app/validationSchemas';
import { z } from 'zod';

type IssueForm = z.infer<typeof validationSchemas>

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(validationSchemas)
    });
    const [error, setError] = useState('')

    return (
        <div className="max-w-xl ">
            {error && <Callout.Root color="blue" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className="space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        setError('An unepected error occurred')
                    }
                })}>
                <TextField.Root placeholder="Title" {...register('title')} />
                {errors.title && <Text color="blue" as="p">{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                {errors.description && <Text color="blue" as="p">{errors.description.message}</Text>}

                <Button>Submit New Issues</Button>

            </form>
        </div>
    )
}

export default NewIssuePage 