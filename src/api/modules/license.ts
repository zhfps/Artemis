import request from '@/utils/axios'
import { v4 as uuidv4 } from 'uuid'


/**
 * 导入licens
 * @param list 
 * @returns 
 */
export async function createRows(list: any[]) {
    const bactchId = uuidv4()
    const changesetId = uuidv4()
    let index = 1
    let batch = ''
    batch += `--batch_${bactchId}
    Content-Type: multipart/mixed; boundary="changeset_${changesetId}"`
    //1.写入信息
    list.map((item) => {
        batch += `
  
        --changeset_${changesetId}
        Content-Type: application/http
        Content-Transfer-Encoding: binary
        Content-ID: ${index++}
  
        POST /api/data/v9.2/cr2f3_licenses HTTP/1.1
        Content-Type: application/json; type=entry
  
        {
            "cr2f3_lk_license_customer@odata.bind": ${item.company_id ? `"/cr2f3_gubocrmcustomerbases(${item.company_id})"` : null},
            "cr2f3_lk_license_contact@odata.bind": ${item.account_id ? `"/cr2f3_crmcontacts(${item.account_id})"` : null},
            "cr2f3_product": ${item.producttype},
            "cr2f3_status": 165990001,
            "cr2f3_statge": 165990003,
            "cr2f3_type": 165990000,
            "cr2f3_phone": "${item.phone || ''}",
            "cr2f3_email": "${item.email}",
            "cr2f3_astart": "${item.crateon}",
            "cr2f3_licensestart": "${item.crateon}",
            "cr2f3_aend": "${item.enddate}",
            "cr2f3_licenseend": "${item.enddate}",
            "cr2f3_user": "${item.user}",
            "cr2f3_approvalby": "pearl.he@guwave.com",
            "cr2f3_approvalcommit": "approval",
            "cr2f3_approvalon": "${item.crateon}",
            "cr2f3_useremail": "${item.user_email||''}",
            "cr2f3_desc": "${item.reson||''}",
            "cr2f3_applydate": "${item.crateon}",
            "cr2f3_remark": "导入"
        }
        `
    })
    //4.添加结尾
    batch += `
    --changeset_${changesetId}--
  
    --batch_${bactchId}--
    `
    return request({
        url: '/$batch',
        headers: {
            'Content-Type': `multipart/mixed;boundary=batch_${bactchId}`,
            Accept: 'application/json',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0'
        },
        method: 'post',
        data: batch.replace(/ {2,}/g, '')
    })
}