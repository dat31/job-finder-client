import { GraphQLError } from "graphql";

enum Industry {
    INDUSTRY1 = 'INDUSTRY1',
    INDUSTRY2 = 'INDUSTRY2'
}

enum EmploymentType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME'
}

export enum JobMenuEnum {
    SAVE,
    REPORT,
    NOT_INTERESTED
}

export enum CRUDActions {
    CREATE = "CREATE",
    EDIT = "EDIT",
    DELETE = "DELETE"
}

export type PaginatedResponse<T> = {
    items: T[]
    hasMore: boolean
}

export type BaseEntity = {
    id: number
    createdAt?: string
    //gql prop
    __typename: string
}

export type Job = {
    companyId: Company["id"]
    company: Company
    salary: string
    title: string
    description: string
    applicationDeadline: string,
    requirements: string,
    hasBeenSaved: boolean
} & BaseEntity

export type User = {
    username: string
    email: string
    id: string
}

export type FieldErrors = {
    field: string,
    message: string
}[] & GraphQLError[]

export type Company = {
    name: string
    location: string
    industry: Industry
    jobs: Job[]
    reviews: CompanyReview[]
    employmentType: EmploymentType
} & BaseEntity

export type CompanyReview = {
    companyId: Company["id"]
} & BaseEntity

export type WorkExperience = {
    jobTitle: string
    company: string
    from: string
    to: string
    userId: string
} & BaseEntity

export type WorkSkill = {
    skill: string
    yearOfExperience?: number
    userId: number
} & BaseEntity

export type HottestCategory = {
    title: string
    numberOfJobs: string
}

export type Profile = {
    workExperiences: WorkExperience[]
    workSkills: WorkSkill[]
}
