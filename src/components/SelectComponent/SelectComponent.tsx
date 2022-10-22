import React from 'react'
import styles from './SelectComponent.module.scss'
import '../../styles/components/select/select.scss'
import Select, { Option } from "rc-select";
import {useSelectComponent} from './useSelectComponent'

const SelectComponent = () => {
    const {value, open, onDropdownVisibleChange, onChange, onBlur, onDestroy} = useSelectComponent()

    return (
        <>
            <Select
                placeholder={'id_engine'}
                listHeight={200}
                id="my-select"
                mode="combobox"
                value={value}
                className={styles['select']}
                onBlur={onBlur}
                open={open}
                // optionLabelProp="children"
                optionFilterProp="text"
                onChange={onChange}
                onDropdownVisibleChange={onDropdownVisibleChange}
                filterOption={(inputValue, option) => {
                    if (!inputValue) {
                        return true;
                    }
                    return (option?.value as string).includes(inputValue);
                }}
            >
                {['1', '2', '3', '1', '2', '3','1', '2', '3', '1', '2', '3'].map((i, index) => (
                    <Option value={i} key={index}>
                        {i}
                    </Option>
                ))}
            </Select>
        </>
    )
}

export default SelectComponent
