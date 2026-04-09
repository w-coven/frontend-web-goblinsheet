import {pino} from "pino"
import {LogLayer} from "loglayer"
import {PinoTransport} from "@loglayer/transport-pino";
import {ConsolaTransport} from "@loglayer/transport-consola";
import {createConsola} from 'consola'
import {serializeError} from 'serialize-error'

const p = pino({level: "trace"})
const consola = createConsola({level: 5})

const customLog = new LogLayer({
    contextFieldName: 'context',
    metadataFieldName: 'metadata',
    muteContext: false,
    muteMetadata: false,
    errorSerializer: serializeError,
    transport: [new PinoTransport({
        logger: p,
        enabled: process.env.NODE_ENV === 'production'
    }), new ConsolaTransport({
        logger: consola,
        enabled: process.env.NODE_ENV !== 'production'
    })]
})

export {customLog}
