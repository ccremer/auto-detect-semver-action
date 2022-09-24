import * as core from '@actions/core'
import {Configuration, readConfigurationFile} from './configuration'
import { VersionIncrementor } from './incrementor'

async function run(): Promise<void> {
  try {
    const configPath: string = core.getInput('configuration')
    const configuration: Configuration = readConfigurationFile(configPath)
    console.log(configuration)
    const incrementor  = new VersionIncrementor('', core.getInput('fromTag'), configuration)
    const result = incrementor.increment()
    console.log(result)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
