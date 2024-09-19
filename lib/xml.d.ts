/// <reference types="node" />
import { Node } from './types';
declare const parseXml: (templateXml: string) => Promise<Node>;
type XmlOptions = {
    literalXmlDelimiter: string;
};
declare const buildXml: (node: Node, options: XmlOptions, indent?: string) => Buffer;
export { parseXml, buildXml };
