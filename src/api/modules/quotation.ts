import config from '@/config'
import request from '@/utils/axios'

/**
 * 
 * @param page 
 * @param pageSize 
 * @returns 
 */
export async function lockList(page: number, pageSize: number) {
    const xml = `
    <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="${page}" count="${pageSize}" no-lock="false">
       <entity name="cr2f3_guboordergoodsitemnew">
        <attribute name="cr2f3_no"/>
        <attribute name="statecode"/>
        <attribute name="cr2f3_guboordergoodsitemnewid"/>
        <attribute name="cr2f3_quotation"/>
        <attribute name="cr2f3_pn"/>
        <attribute name="cr2f3_model"/>
        <attribute name="cr2f3_qty"/>
        <attribute name="cr2f3_reservenumber"/>
        <attribute name="cr2f3_description"/>
        <attribute name="cr2f3_remark"/>
        <attribute name="cr2f3_concentratno"/>
        <attribute name="cr2f3_price"/>
        <attribute name="cr2f3_discount"/>
        <attribute name="cr2f3_picknumber"/>
        <attribute name="cr2f3_taxrate"/>
        <filter type="and">
            <condition attribute="cr2f3_concentratno" operator="not-null"/>
            <condition attribute="statecode" operator="eq" value="0"/>
            <condition attribute="cr2f3_reservenumber" operator="gt" value="0"/>
        </filter>
        <link-entity name="cr2f3_gubocontractmains" alias="aa" link-type="inner" from="cr2f3_gubocontractmainsid" to="cr2f3_gubocontractmains">
            <filter type="and">
            <condition attribute="statecode" operator="eq" value="0"/>
            <condition attribute="cr2f3_status" operator="ne" value="作废"/>
            </filter>
        </link-entity>
       </entity>
    </fetch>`
    return request<IResponse<any>>({
      url: '/cr2f3_guboordergoodsitemnews',
      headers: config.headers,
      method: 'get',
      params: {
        fetchXml: xml
      }
    })
  }

  /**
   * 按照产品分组统计
   * @param page 
   * @param pageSize 
   * @returns 
   */
  export async function lockGroup() {
    const xml = `
    <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" aggregate='true' no-lock="false">
       <entity name="cr2f3_guboordergoodsitemnew">
        <attribute name="cr2f3_pn" alias='pn' groupby='true'/>
        <attribute name="cr2f3_model" alias='model' groupby='true'/>
        <attribute name="cr2f3_reservenumber" alias='lockqty' aggregate='sum'/>
        <filter type="and">
            <condition attribute="cr2f3_concentratno" operator="not-null"/>
            <condition attribute="statecode" operator="eq" value="0"/>
            <condition attribute="cr2f3_reservenumber" operator="gt" value="0"/>
        </filter>
        <link-entity name="cr2f3_gubocontractmains" alias="aa" link-type="inner" from="cr2f3_gubocontractmainsid" to="cr2f3_gubocontractmains">
            <filter type="and">
            <condition attribute="statecode" operator="eq" value="0"/>
            <condition attribute="cr2f3_status" operator="ne" value="作废"/>
            </filter>
        </link-entity>
       </entity>
    </fetch>`
    return request<IResponse<any>>({
      url: '/cr2f3_guboordergoodsitemnews',
      headers: config.headers,
      method: 'get',
      params: {
        fetchXml: xml
      }
    })
  }