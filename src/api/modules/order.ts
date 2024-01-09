import config from '@/config'
import request from '@/utils/axios'

/**
 * 在途数量
 * @returns 
 */
export async function enRouteGroup() {
    const xml = `
    <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" aggregate='true' no-lock="false">
       <entity name="cr2f3_guboorderdetail">
        <attribute name="cr2f3_pn" alias='pn' groupby='true'/>
        <attribute name="cr2f3_model" alias='model' groupby='true'/>
        <attribute name="cr2f3_noarrivalqty" alias='noarrivalqty' aggregate='sum'/>
        <filter type="and">
          <condition attribute="statecode" operator="eq" value="0" />
          <condition attribute="cr2f3_noarrivalqty" operator="gt" value="0" />
        </filter>
        <link-entity  alias="dd" name="cr2f3_guboorder" from="cr2f3_guboorderid" to="cr2f3_guboorder" link-type="inner">
            <filter type="and">
            <condition attribute="statecode" operator="eq" value="0" />
            <condition attribute="cr2f3_ordertype" operator="ne" value="维修订单" />
            </filter>
        </link-entity>
       </entity>
    </fetch>`
    return request<IResponse<any>>({
      url: '/cr2f3_guboorderdetails',
      headers: config.headers,
      method: 'get',
      params: {
        fetchXml: xml
      }
    })
  }