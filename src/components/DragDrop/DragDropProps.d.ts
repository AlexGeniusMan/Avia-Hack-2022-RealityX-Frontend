import {DefaultParams} from '../../types/Types'

export interface DragDropProps extends DefaultParams {
    handleFile?: (file: File) => void
}
