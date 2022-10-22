import {useState} from 'react'

export const useSelectComponent = () => {
    const [destroy, setDestroy] = useState(false)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    const onChange = (e:any) => {
        let value;
        if (e && e.target) {
            ({ value } = e.target);
        } else {
            value = e;
        }
        console.log('onChange', value);
        setValue(value)
    };

    const onDestroy = () => {
        setDestroy(true)
    };

    const onBlur = (v:any) => {
        console.log('onBlur', v);
    };

    const onDropdownVisibleChange = (open: boolean) => {
        setOpen(open)
    };

    return{onChange, onDestroy, onBlur, value, onDropdownVisibleChange, open}
}
