import { XMLParser, XMLBuilder, } from 'fast-xml-parser'
//
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix : '@_'
})
//
const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix : '@_',
  suppressBooleanAttributes: false,
})

/**
 * 
 * @param xml 
 * @returns 
 */
export function parseXML(xml: string) {
    return parser.parse(xml)
}

/**
 * 
 * @param obj 
 * @returns 
 */
export function buildXML(obj: any) {
    return builder.build(obj)
}