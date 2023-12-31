import Head from 'next/head'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import Button, { Variant } from '../components/core/Button'
import QRModal from '../components/QRModal'
import Section from '../components/Section'
import {
  getQRCodeData,
  resetSections,
  uploadConfig,
  useQRScoutState,
} from '../components/store/store'


export default function Home() {
  const formData = useQRScoutState((state) => state.formData)

  const [showQR, setShowQR] = useState(false)

  const missingRequiredFields = useMemo(() => {
    return formData.sections
      .map((s) => s.fields)
      .flat()
      .filter(
        (f) =>
          f.required &&
          (f.value === null || f.value === undefined || f.value === ``)
      )
  }, [formData])
  
  function getFieldValue(code: string): any {
    return formData.sections
      .map((s) => s.fields)
      .flat()
      .find((f) => f.code === code)?.value
  }

  function download(filename: string, text: string) {
    var element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    )
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  function downloadConfig() {
    const configDownload = { ...formData }

    configDownload.sections.forEach((s) =>
      s.fields.forEach((f) => (f.value = undefined))
    )
    download('QRScout_config.json', JSON.stringify(configDownload))
  }

  return (
    <div className="min-h-screen py-2">
      <Head>
        <title>{formData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="font-sans text-6xl font-bold">
          <div className={`font-rhr text-red-rhr`}>{formData.page_title}</div>
        </h1>
        <QRModal
          show={showQR}
          title={`${getFieldValue('robot')} - ${getFieldValue('matchNumber')}`}
          data={getQRCodeData()}
          onDismiss={() => setShowQR(false)}
        />

        <form className="w-full px-4">
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {formData.sections.map((section) => {
              return <Section key={section.name} name={section.name} />
            })}

            <div className="mb-4 flex flex-col justify-center rounded bg-white py-2 shadow-md">
              <button
                className="focus:shadow-outline mx-2 rounded bg-gray-700 py-6 px-6 font-bold uppercase text-white hover:bg-gray-700 focus:shadow-lg focus:outline-none disabled:bg-gray-300"
                type="button"
                onClick={() => setShowQR(true)}
                disabled={missingRequiredFields.length > 0}
              >
                Submit
              </button>
              <button
                className="focus:shadow-outline mx-2 my-6 rounded border border-red-rhr bg-white py-2 font-bold uppercase text-red-rhr hover:bg-red-200 focus:outline-none"
                type="button"
                onClick={() => resetSections()}
              >
                Reset
              </button>
              </div>
          </div>
        </form>
      </main>
      <footer>
      </footer>
    </div>
  )
}
