import request from '@/utils/axios'

export function WhoAmI(){
   return request({
        url: '/WhoAmI',
        method: 'get'
      })
}

