'use client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
    return (
        <Select.Root defaultValue="apple">
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="1">Johnnybravo</Select.Item>
                    <Select.Item value="2">Chibuzor</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>

    )
}

export default AssigneeSelect