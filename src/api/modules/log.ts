import request from '@/utils/axios'
import config from '@/utils/config'
import dayjs from 'dayjs'

/**
 * 日志
 * @returns 
 */
export function audits(){
   return request<IResponse<any>>({
        url: '/audits',
        method: 'get',
        headers: config.headers,
        params: {
            fetchXml: ` <fetch mapping="logical" version="1.0">
            <entity name="audit">
              <all-attributes />            
              <filter type="and">
                <condition attribute="createdon" operator="gt" value="${dayjs().add(-1,'day').format('YYYY-MM-DD')}" />
              </filter>
              <order attribute="createdon" descending="true" />
            </entity>
          </fetch>
          `
        }
      })
}

/**
 * 
 * @param page 
 * @param pageSize 
 * @returns 
 */
export async function changeLog(page: number, pageSize: number) {
  const xml = `
  <fetch version="1.0" output-format="xml-platform" page="${page}" count="${pageSize}" mapping="logical" returntotalrecordcount="true">
  <entity name="audit">
      <all-attributes />
      <filter type="and">
        <condition attribute="operation" operator="ne" value="4"/>
        <condition attribute="createdon" operator="gt" value="${dayjs().add(-1,'day').format('YYYY-MM-DD')}" />
      </filter>
      <order attribute="createdon" descending="true" />
    </entity>
</fetch>`
  return request<IResponse<any>>({
    url: '/audits',
    headers: config.headers,
    method: 'get',
    params: {
      fetchXml: xml
    }
  })
}