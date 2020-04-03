

    export interface Customer {
        id: number;
        customerName: string;
        customerShortName: string;
        createBy: string;
        createDate: Date;
        updateBy: string;
        updateDate: Date;
        inActivated: boolean;
    }

    export interface Project {
        id: number;
        customerId: number;
        customer: Customer;
        projectName: string;
        createBy: string;
        createDate: Date;
        updateBy: string;
        updateDate: Date;
        inActivated: boolean;
    }
 
    export interface Activity {
        id: number;
        activityName: string;
        createBy: string;
        createDate: Date;
        updateBy: string;
        updateDate: Date;
        inActivated: boolean;
    }

    export interface DailyRecord {
        id: number;
        indendityId: number;
        employeeName: string;
        projectId: number;
        project: Project;
        activityId: number;
        activity: Activity;
        wokingDate: Date;
        workingDuration: number;
        createBy: string;
        createDate: Date;
        updateBy: string;
        updateDate: Date;
    }

    export interface GetAllActive {
        id: number;
        customerName: string;
        customerShortName: string;
        createBy: string;
        createDate: Date;
        updateBy: string;
        updateDate: Date;
        inActivated: boolean;
    }



