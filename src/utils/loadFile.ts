export const loadFile = (e, dispatch, setFile) => {
  const files = e.target.files

  if (files && files.length > 0) {
    if (files[0]?.size > 10000000) {
      alert('Файл слишком большой. Максимальный размер 10 Mb')

      return
    }

    if (files[0]?.type !== 'image/jpeg' && files[0]?.type !== 'image/png') {
      alert('Неверный тип файла')
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      if (reader?.result) {
        setFile(reader.result)
      }
    }
  }
}
