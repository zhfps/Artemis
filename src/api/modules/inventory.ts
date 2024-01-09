import config from '@/config'
import request from '@/utils/axios'

/**
 * 库存主表锁定数量
 * @returns 
 */
export async function mainLock() {
    const xml = `
    <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" no-lock="false">
       <entity name="cr2f3_guboinventorymain">
        <attribute name="cr2f3_pn"/>
        <attribute name="cr2f3_model"/>
        <attribute name="cr2f3_locknum"/>
        <filter type="and">
            <condition attribute="statecode" operator="eq" value="0"/>
            <condition attribute="cr2f3_locknum" operator="gt" value="0"/>
        </filter>
       </entity>
    </fetch>`
    return request<IResponse<any>>({
      url: '/cr2f3_guboinventorymains',
      headers: config.headers,
      method: 'get',
      params: {
        fetchXml: xml
      }
    })
  }