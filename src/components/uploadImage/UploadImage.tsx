import { Modal } from 'antd'
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { UploadListType } from 'antd/es/upload/interface'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export interface UploadImageProps {
  listType?: UploadListType
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function UploadImage({ listType = 'picture-circle' }: UploadImageProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const uploadButton = (
    <div className='flex flex-col items-center'>
      <AiOutlinePlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <>
      <Upload
        action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
        listType={listType}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        className='text-center'
      >
        {fileList.length !== 0 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}
