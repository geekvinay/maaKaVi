import { Request, Response } from 'express'
import { createUserInDb, getUserFromDb } from '../../repository/user/user'
import { getCohortFromDb } from '../../repository/cohort/cohort'
import { getLearningModulesByCohortId } from '../../repository/learning_module/learning_module'

export const healthcheck = (req: Request, res: Response) => {
  res.send('OK')
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserInDb(req.body)
    res.status(201).json(user)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const user = await getUserFromDb(userId)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Function to get list of cohort Name and fetch all the modules (module Name) in that cohort
export const getUserCohorts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    // Assuming getUserFromDb populates the user's cohorts
    const userWithCohorts = await getUserFromDb(userId)
    console.log('userWithCohorts: ', userWithCohorts)
    const getModuleNames = async (cohortId: string) => {
      const modules = await getLearningModulesByCohortId(cohortId)
      return modules.map((module: any) => {
        return {
          _id: module._id,
          name: module.moduleName,
          title: module.moduleTitle,
          description: module.moduleDescription
        }
      })
    }
    if (userWithCohorts && userWithCohorts.chosenCohorts.length > 0) {
      const cohortsDetails = await Promise.all(
        userWithCohorts.chosenCohorts.map(async cohort => {
          console.log('cohort: ', cohort)
          // Assuming each cohort has a method to populate its modules
          const cohortObject = await getCohortFromDb(cohort._id.toString())
          if (!cohortObject) {
            return null
          }
          return {
            cohortName: cohortObject?.cohortName,
            modules: await getModuleNames(cohort._id.toString())
          }
        })
      )
      res.json(cohortsDetails)
    } else {
      res.status(404).json({ error: 'User not found or has no cohorts' })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
