import * as core from '@actions/core'
import * as fs from 'fs'

export interface Configuration {
  categories: Category[]
  ignore_labels: string[]
}

export interface Category {
  labels: string[]
  exclude_labels?: string[]
  exhaustive?: boolean
  incrementPolicy: 'patch' | 'minor' | 'major'
}

export const DefaultConfiguration: Configuration = {
  categories: [
    {
      labels: ['enhancement'],
      incrementPolicy: 'minor'
    },
    {
      labels: ['bug'],
      incrementPolicy: 'patch'
    },
    {
      labels: ['breaking'],
      incrementPolicy: 'major'
    }
  ],
  ignore_labels: ['ignore']
}

/**
 * Reads and parses a {@link Configuration} from the provided filepath.
 * @param filepath The path to the config file.
 * @returns the {@link Configuration} if it can be read and parsed as JSON, or {@link DefaultConfiguration} as fallback.
 */
export function readConfigurationFile(filepath: string): Configuration {
  try {
    const rawData = fs.readFileSync(filepath, 'utf-8')
    return parseConfiguration(rawData)
  } catch (error) {
    core.info(`⚠️ Configuration provided, but it couldn't be read. Fallback to Defaults.`)
    return DefaultConfiguration
  }
}

/**
 * Parses the given string into a {@link Configuration}.
 * @param config is a string that contains JSON.
 * @returns the {@link Configuration} if it can be parsed as JSON, or {@link DefaultConfiguration} as fallback.
 */
export function parseConfiguration(config: string): Configuration {
  try {
    const configJson: Configuration = JSON.parse(config)
    return configJson
  } catch (error) {
    core.info(`⚠️ Configuration provided, but it couldn't be parsed. Fallback to Defaults.`)
    return DefaultConfiguration
  }
}
