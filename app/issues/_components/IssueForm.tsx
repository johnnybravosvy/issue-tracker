'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller, handleSubmit, formState } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchemas } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from "react-simplemde-editor"



type IssueFormData = z.infer<typeof validationSchemas>


const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(validationSchemas)
    });
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue)
                await axios.patch("/api/issues/" + issue.id, data)
            else
                await axios.post('/api/issues', data)
            router.push('/issues/list')
            router.refresh();
        } catch (error) {
            setSubmitting(false)
            setError('An unepected error occurred')
        }
    })

    return (
        <div className="max-w-xl ">
            {error && <Callout.Root color="blue" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={onSubmit}>
                <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')} />

                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>

                <Button disabled={isSubmitting}>
                    {issue ? "Update Issue" : "Submit New Issue"}{" "} {isSubmitting && <Spinner />}
                </Button>

            </form>
        </div>
    )
}

export default IssueForm 