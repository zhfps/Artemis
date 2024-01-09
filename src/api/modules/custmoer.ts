import config from '@/config'
import request from '@/utils/axios'

export async function companyList(comoanys: string[]) {
    let values = ''
    for (let index = 0; index < comoanys.length; index++) {
      const item = comoanys[index]
      values+=`<value>${item}</value>`
    }
    const fetchXml = `
    <fetch version="1.0" mapping="logical" returntotalrecordcount="true" no-lock="false">
    <entity name="cr2f3_gubocrmcustomerbase">
      <attribute name="cr2f3_gubocrmcustomerbaseid" />
      <attribute name="cr2f3_account" />
      <filter type="and">
         <condition attribute="statecode" operator="eq" value="0"/>
         <condition attribute="cr2f3_account" operator="in">
           ${values}
         </condition>
      </filter>
    </entity>
  </fetch>
  `
    return request<IResponse<any>>({
      url: '/cr2f3_gubocrmcustomerbases',
      headers: config.headers,
      method: 'get',
      params: {
        fetchXml: fetchXml.replace(/^\s*[\r\n]/gm, '')
      }
    })
  }
  