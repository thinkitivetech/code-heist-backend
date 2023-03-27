

import { Test, TestingModule } from '@nestjs/testing';
import { GetTimeSheetReq, ORDER, PatchTimeSheetReq, TimeSheetStatusReq, TIME_SHEET_STATUS } from './dto/time-sheet-dto';
import { TimeSheetService } from './time-sheet.service';

const getTimeSheetResponse = {
    "success": true,
    "message": "Time sheet fetched successfully",
    "data": {
        "statusCode": "success",
        "data": [
            {
                "id": 36,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "Approved",
                "createdAt": "2023-02-05T00:24:05.786Z",
                "updatedAt": "2023-02-05T00:24:05.786Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 53,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-05T00:24:05.802Z",
                        "updatedAt": "2023-02-05T00:24:05.802Z",
                        "timeSheetId": 36,
                        "taskDate": "2023-01-10"
                    },
                    {
                        "id": 54,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-05T00:24:05.806Z",
                        "updatedAt": "2023-02-05T00:24:05.806Z",
                        "timeSheetId": 36
                    }
                ]
            },
            {
                "id": 35,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:12:47.522Z",
                "updatedAt": "2023-02-04T22:12:47.509Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 51,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:12:47.511Z",
                        "updatedAt": "2023-02-04T22:12:47.511Z",
                        "timeSheetId": 35,
                        "taskDate": "2023-01-11"
                    },
                    {
                        "id": 52,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:12:47.512Z",
                        "updatedAt": "2023-02-04T22:12:47.512Z",
                        "timeSheetId": 35
                    }
                ]
            },
            {
                "id": 34,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:12:33.226Z",
                "updatedAt": "2023-02-04T22:12:33.218Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 49,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:12:33.219Z",
                        "updatedAt": "2023-02-04T22:12:33.219Z",
                        "timeSheetId": 34,
                        "taskDate": "2023-01-12"
                    },
                    {
                        "id": 50,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:12:33.219Z",
                        "updatedAt": "2023-02-04T22:12:33.219Z",
                        "timeSheetId": 34
                    }
                ]
            },
            {
                "id": 33,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:09:16.929Z",
                "updatedAt": "2023-02-04T22:09:16.921Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 47,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:09:16.923Z",
                        "updatedAt": "2023-02-04T22:09:16.923Z",
                        "timeSheetId": 33,
                        "taskDate": "2023-01-13"
                    },
                    {
                        "id": 48,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:09:16.923Z",
                        "updatedAt": "2023-02-04T22:09:16.923Z",
                        "timeSheetId": 33
                    }
                ]
            },
            {
                "id": 32,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:08:19.981Z",
                "updatedAt": "2023-02-04T22:08:19.977Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 45,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:08:19.978Z",
                        "updatedAt": "2023-02-04T22:08:19.978Z",
                        "timeSheetId": 32,
                        "taskDate": "2023-01-14"
                    },
                    {
                        "id": 46,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:08:19.979Z",
                        "updatedAt": "2023-02-04T22:08:19.979Z",
                        "timeSheetId": 32
                    }
                ]
            },
            {
                "id": 31,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:06:59.782Z",
                "updatedAt": "2023-02-04T22:06:59.781Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 43,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:06:59.781Z",
                        "updatedAt": "2023-02-04T22:06:59.781Z",
                        "timeSheetId": 31,
                        "taskDate": "2023-01-15"
                    },
                    {
                        "id": 44,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:06:59.781Z",
                        "updatedAt": "2023-02-04T22:06:59.781Z",
                        "timeSheetId": 31
                    }
                ]
            },
            {
                "id": 30,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:06:56.128Z",
                "updatedAt": "2023-02-04T22:06:56.120Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 41,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:06:56.121Z",
                        "updatedAt": "2023-02-04T22:06:56.121Z",
                        "timeSheetId": 30,
                        "taskDate": "2023-01-16"
                    },
                    {
                        "id": 42,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:06:56.122Z",
                        "updatedAt": "2023-02-04T22:06:56.122Z",
                        "timeSheetId": 30
                    }
                ]
            },
            {
                "id": 29,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:06:45.254Z",
                "updatedAt": "2023-02-04T22:06:45.247Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 39,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:06:45.248Z",
                        "updatedAt": "2023-02-04T22:06:45.248Z",
                        "timeSheetId": 29,
                        "taskDate": "2023-01-17"
                    },
                    {
                        "id": 40,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:06:45.248Z",
                        "updatedAt": "2023-02-04T22:06:45.248Z",
                        "timeSheetId": 29
                    }
                ]
            },
            {
                "id": 28,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:06:06.532Z",
                "updatedAt": "2023-02-04T22:06:06.522Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 37,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:06:06.524Z",
                        "updatedAt": "2023-02-04T22:06:06.524Z",
                        "timeSheetId": 28,
                        "taskDate": "2023-01-18"
                    },
                    {
                        "id": 38,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:06:06.525Z",
                        "updatedAt": "2023-02-04T22:06:06.525Z",
                        "timeSheetId": 28
                    }
                ]
            },
            {
                "id": 27,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:05:56.371Z",
                "updatedAt": "2023-02-04T22:05:56.354Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 35,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:05:56.356Z",
                        "updatedAt": "2023-02-04T22:05:56.356Z",
                        "timeSheetId": 27,
                        "taskDate": "2023-01-19"
                    },
                    {
                        "id": 36,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:05:56.357Z",
                        "updatedAt": "2023-02-04T22:05:56.357Z",
                        "timeSheetId": 27
                    }
                ]
            },
            {
                "id": 26,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T22:05:25.393Z",
                "updatedAt": "2023-02-04T22:05:25.385Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 33,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:05:25.387Z",
                        "updatedAt": "2023-02-04T22:05:25.387Z",
                        "timeSheetId": 26,
                        "taskDate": "2023-01-20"
                    },
                    {
                        "id": 34,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:05:25.387Z",
                        "updatedAt": "2023-02-04T22:05:25.387Z",
                        "timeSheetId": 26
                    }
                ]
            },
            {
                "id": 25,
                "name": "time-com",
                "projectDetail": "noot",
                "assignedTo": "bhosale",
                "status": "no",
                "note": "",
                "createdAt": "2023-02-04T22:00:56.771Z",
                "updatedAt": "2023-02-04T22:00:56.764Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 31,
                        "task": "test done",
                        "minutes": 330,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:00:56.765Z",
                        "updatedAt": "2023-02-04T22:00:56.765Z",
                        "timeSheetId": 25,
                        "taskDate": "2023-01-21"
                    },
                    {
                        "id": 32,
                        "task": "test ot",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T22:00:56.765Z",
                        "updatedAt": "2023-02-04T22:00:56.765Z",
                        "timeSheetId": 25
                    }
                ]
            },
            {
                "id": 24,
                "name": "time-sjheet",
                "projectDetail": null,
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T21:01:22.764Z",
                "updatedAt": "2023-02-04T21:01:22.764Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 29,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T21:01:22.777Z",
                        "updatedAt": "2023-02-04T21:01:22.777Z",
                        "timeSheetId": 24,
                        "taskDate": "2023-01-22"
                    },
                    {
                        "id": 30,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T21:01:22.784Z",
                        "updatedAt": "2023-02-04T21:01:22.784Z",
                        "timeSheetId": 24
                    }
                ]
            },
            {
                "id": 23,
                "name": "time-com",
                "projectDetail": "noot",
                "assignedTo": "bhosale",
                "status": "no",
                "note": "",
                "createdAt": "2023-02-04T20:12:26.951Z",
                "updatedAt": "2023-02-04T20:12:26.948Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 27,
                        "task": "test done",
                        "minutes": 330,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:12:26.948Z",
                        "updatedAt": "2023-02-04T20:12:26.948Z",
                        "timeSheetId": 23,
                        "taskDate": "2023-01-23"
                    },
                    {
                        "id": 28,
                        "task": "test ot",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:12:26.948Z",
                        "updatedAt": "2023-02-04T20:12:26.948Z",
                        "timeSheetId": 23
                    }
                ]
            },
            {
                "id": 22,
                "name": "time-com",
                "projectDetail": "noot",
                "assignedTo": "bhosale",
                "status": "no",
                "note": "",
                "createdAt": "2023-02-04T20:12:15.904Z",
                "updatedAt": "2023-02-04T20:12:15.899Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 25,
                        "task": "test done",
                        "minutes": 330,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:12:15.899Z",
                        "updatedAt": "2023-02-04T20:12:15.899Z",
                        "timeSheetId": 22,
                        "taskDate": "2023-01-24"
                    },
                    {
                        "id": 26,
                        "task": "test ot",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:12:15.899Z",
                        "updatedAt": "2023-02-04T20:12:15.899Z",
                        "timeSheetId": 22
                    }
                ]
            },
            {
                "id": 21,
                "name": "time-com",
                "projectDetail": "noot",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T20:12:10.675Z",
                "updatedAt": "2023-02-04T20:12:10.672Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 23,
                        "task": "test done",
                        "minutes": 330,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:12:10.672Z",
                        "updatedAt": "2023-02-04T20:12:10.672Z",
                        "timeSheetId": 21,
                        "taskDate": "2023-01-25"
                    },
                    {
                        "id": 24,
                        "task": "test ot",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:12:10.672Z",
                        "updatedAt": "2023-02-04T20:12:10.672Z",
                        "timeSheetId": 21
                    }
                ]
            },
            {
                "id": 20,
                "name": "time-com",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T20:11:14.158Z",
                "updatedAt": "2023-02-04T20:11:14.156Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 21,
                        "task": "test done",
                        "minutes": 330,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:11:14.156Z",
                        "updatedAt": "2023-02-04T20:11:14.156Z",
                        "timeSheetId": 20,
                        "taskDate": "2023-01-26"
                    },
                    {
                        "id": 22,
                        "task": "test ot",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:11:14.156Z",
                        "updatedAt": "2023-02-04T20:11:14.156Z",
                        "timeSheetId": 20
                    }
                ]
            },
            {
                "id": 19,
                "name": "time-com",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T20:11:09.952Z",
                "updatedAt": "2023-02-04T20:11:09.949Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 19,
                        "task": "test done",
                        "minutes": 330,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:11:09.950Z",
                        "updatedAt": "2023-02-04T20:11:09.950Z",
                        "timeSheetId": 19,
                        "taskDate": "2023-01-27"
                    },
                    {
                        "id": 20,
                        "task": "test ot",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:11:09.950Z",
                        "updatedAt": "2023-02-04T20:11:09.950Z",
                        "timeSheetId": 19
                    }
                ]
            },
            {
                "id": 18,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T20:10:57.991Z",
                "updatedAt": "2023-02-04T20:10:57.988Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 17,
                        "task": "test done",
                        "minutes": 330,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:10:57.988Z",
                        "updatedAt": "2023-02-04T20:10:57.988Z",
                        "timeSheetId": 18,
                        "taskDate": "2023-01-28"
                    },
                    {
                        "id": 18,
                        "task": "test ot",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:10:57.988Z",
                        "updatedAt": "2023-02-04T20:10:57.988Z",
                        "timeSheetId": 18
                    }
                ]
            },
            {
                "id": 17,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T20:10:47.595Z",
                "updatedAt": "2023-02-04T20:10:47.591Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 15,
                        "task": "test done",
                        "minutes": 330,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:10:47.592Z",
                        "updatedAt": "2023-02-04T20:10:47.592Z",
                        "timeSheetId": 17,
                        "taskDate": "2023-01-29"
                    },
                    {
                        "id": 16,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:10:47.592Z",
                        "updatedAt": "2023-02-04T20:10:47.592Z",
                        "timeSheetId": 17
                    }
                ]
            },
            {
                "id": 16,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T20:10:16.236Z",
                "updatedAt": "2023-02-04T20:10:16.226Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 13,
                        "task": "test done",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:10:16.227Z",
                        "updatedAt": "2023-02-04T20:10:16.227Z",
                        "timeSheetId": 16,
                        "taskDate": "2023-01-30"
                    },
                    {
                        "id": 14,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T20:10:16.228Z",
                        "updatedAt": "2023-02-04T20:10:16.228Z",
                        "timeSheetId": 16
                    }
                ]
            },
            {
                "id": 15,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:14:41.734Z",
                "updatedAt": "2023-02-04T19:14:41.734Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 11,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T19:14:41.752Z",
                        "updatedAt": "2023-02-04T19:14:41.752Z",
                        "timeSheetId": 15,
                        "taskDate": "2023-01-31"
                    },
                    {
                        "id": 12,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T19:14:41.759Z",
                        "updatedAt": "2023-02-04T19:14:41.759Z",
                        "timeSheetId": 15
                    }
                ]
            },
            {
                "id": 14,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:14:09.788Z",
                "updatedAt": "2023-02-04T19:14:09.788Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 10,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T19:14:09.798Z",
                        "updatedAt": "2023-02-04T19:14:09.798Z",
                        "timeSheetId": 14,
                        "taskDate": "2023-01-32"
                    }
                ]
            },
            {
                "id": 13,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:14:09.124Z",
                "updatedAt": "2023-02-04T19:14:09.124Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 9,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T19:14:09.141Z",
                        "updatedAt": "2023-02-04T19:14:09.141Z",
                        "timeSheetId": 13,
                        "taskDate": "2023-01-33"
                    }
                ]
            },
            {
                "id": 12,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:12:43.913Z",
                "updatedAt": "2023-02-04T19:12:43.913Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 8,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T19:12:43.920Z",
                        "updatedAt": "2023-02-04T19:12:43.920Z",
                        "timeSheetId": 12,
                        "taskDate": "2023-01-34"
                    }
                ]
            },
            {
                "id": 11,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:12:43.157Z",
                "updatedAt": "2023-02-04T19:12:43.157Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 7,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T19:12:43.185Z",
                        "updatedAt": "2023-02-04T19:12:43.185Z",
                        "timeSheetId": 11,
                        "taskDate": "2023-01-35"
                    }
                ]
            },
            {
                "id": 10,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:12:21.168Z",
                "updatedAt": "2023-02-04T19:12:21.168Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 6,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T19:12:21.178Z",
                        "updatedAt": "2023-02-04T19:12:21.178Z",
                        "timeSheetId": 10,
                        "taskDate": "2023-01-36"
                    }
                ]
            },
            {
                "id": 9,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:12:01.951Z",
                "updatedAt": "2023-02-04T19:12:01.951Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": [
                    {
                        "id": 5,
                        "task": "test tresk",
                        "minutes": 150,
                        "notes": "test notes",
                        "editedBy": "bhosale",
                        "profile": "bhosale",
                        "status": "completed",
                        "createdAt": "2023-02-04T19:12:01.979Z",
                        "updatedAt": "2023-02-04T19:12:01.980Z",
                        "timeSheetId": 9,
                        "taskDate": "2023-01-37"
                    }
                ]
            },
            {
                "id": 8,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:10:56.191Z",
                "updatedAt": "2023-02-04T19:10:56.191Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": []
            },
            {
                "id": 7,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T19:10:31.420Z",
                "updatedAt": "2023-02-04T19:10:31.420Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": []
            },
            {
                "id": 6,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T18:41:17.512Z",
                "updatedAt": "2023-02-04T18:41:17.512Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": []
            },
            {
                "id": 5,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T18:34:01.689Z",
                "updatedAt": "2023-02-04T18:34:01.689Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": []
            },
            {
                "id": 4,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T17:53:25.346Z",
                "updatedAt": "2023-02-04T17:53:25.346Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": []
            },
            {
                "id": 3,
                "name": "time-sjheet",
                "projectDetail": "time-sjheet-tracker",
                "assignedTo": "bhosale",
                "status": "active",
                "note": "",
                "createdAt": "2023-02-04T17:52:55.053Z",
                "updatedAt": "2023-02-04T17:52:55.053Z",
                "engineerId": 1,
                "teamLeadId": null,
                "managerId": null,
                "taskDetails": []
            }
        ],
        "count": 34,
        "currentPage": 10,
        "nextPage": 11,
        "prevPage": 9,
        "lastPage": 34
    }
}
const getTimeSheetQueryObject = {
    limit: 100,
    engineerId: 1,
    timeSheetId: 1,
    startTime: "2023-02-04T22:12:47.522Z",
    endTime: "2023-03-04T22:12:47.522Z",
    projectId: 1,
    userId: 1,
    page: 1,
    filter: {
        engineerId: 1,
        engineerName: "John Doe",
        teamLeadId: 3,
        timeSheetId: 1,
        teamLeadName: "Bob Smith",
        mangerId: 1,
        managerName: "John Doe",
        projectId: 1,
        projectName: "BlockCube",
        salesId: 1,
        salesName: "Don Johnson",
        companyId: 1,
        status: TIME_SHEET_STATUS.APPROVED,
        order: ORDER.DESC
    }
};

const createTimeSheetInput = {
    "taskDetail": [
        {
            "id": 1,
            "date": "2022-12-02",
            "hourMinute": "2:30",
            "task": "test tresk",
            "notes": "test notes",
            "status": "completed"
        },
        {
            "id": 2,
            "date": "2022-12-02",
            "hourMinute": "2:30",
            "task": "test tresk",
            "notes": "test notes",
            "status": "completed"
        }
    ],
    "engineerId":1,
    "teamLeadId": 2,
    "managerId": 3,
    "name": "time-sjheet",
    "projectDetail": "time-sjheet-tracker",
    "status": "active",
    "assignedTo": 2,
    "note": "Approved",
    "userId":1
}

const createTimeSheetResponse = {
    success: true,
    message: 'Time sheet has been created successfully',
    data: {
        "taskDetail": [
            {
                "date": "2022-12-02",
                "hourMinute": "2:30",
                "task": "test tresk",
                "notes": "test notes",
                "status": "completed"
            },
            {
                "date": "2022-12-02",
                "hourMinute": "2:30",
                "task": "test tresk",
                "notes": "test notes",
                "status": "completed"
            }
        ],
        "engineerId":1,
        "teamLeadId": 2,
        "managerId": 3,
        "name": "time-sjheet",
        "projectDetail": "time-sjheet-tracker",
        "status": "active",
        "assignedTo": 2,
        "note": "Approved",
        "userId":1
    }
}

const timeSheetStatus = {
    status: TIME_SHEET_STATUS.APPROVED,
    userId: 1,
    note: "Approved",
    timeSheetId: 1
}

const timeSheetStatusUpdate = {
    success: true,
    message: 'Time sheet has been updated successfully',
    data: timeSheetStatus
}

const getAllTimeSheet = (timeSheetRequest: GetTimeSheetReq, response: any) => getTimeSheetResponse;
const getTimeSheet = (timeSheetRequest: GetTimeSheetReq, response: any) => getTimeSheetResponse;    
const createTimeSheet = (timeSheetReq: PatchTimeSheetReq, response: any) => createTimeSheetResponse;
const updateStatus = (timeSheetReq: TimeSheetStatusReq, response: any) => timeSheetStatusUpdate;
const updateTimeSheet = (timeSheetReq: PatchTimeSheetReq, timeSheetId: number, response: any) => createTimeSheetResponse

const TimeSheetServiceMock = {
    getAllTimeSheet: jest.fn(() => getAllTimeSheet(getTimeSheetQueryObject, null)),
    getTimeSheet: jest.fn(() => getTimeSheet(getTimeSheetQueryObject, null)),
    createTimeSheet: jest.fn(() => createTimeSheet(createTimeSheetInput, null)),
    updateStatus: jest.fn(() => updateStatus(timeSheetStatus, null)),
    updateTimeSheet: jest.fn(() => updateTimeSheet(createTimeSheetInput, 1, null))
}

describe('Time Sheet Service', () => {
  let timeSheetService: TimeSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeSheetService],
    }).overrideProvider(TimeSheetService).useValue(TimeSheetServiceMock).compile();

    timeSheetService = module.get<TimeSheetService>(TimeSheetService);
  });
  it('should check if time sheet service is defined', () => {
      expect(timeSheetService).toBeDefined();
  });
  it('should get all time sheets', async() => {
    const result = await timeSheetService.getAllTimeSheet(getTimeSheetQueryObject, null);
    expect(result).toEqual(getTimeSheetResponse);
  });
  it('should get all time sheets depending on the parameters passed', async() => {
    const result = await timeSheetService.getTimeSheet(getTimeSheetQueryObject, null);
    expect(result).toEqual(getTimeSheetResponse);
  });
  it('should create a time sheet', async() => {
    const result = await timeSheetService.createTimeSheet(createTimeSheetInput, null);
    expect(result).toEqual(createTimeSheetResponse);
  });
  it('should update status of time sheet', async() => {
    const result = await timeSheetService.updateStatus(timeSheetStatus, null);
    expect(result).toEqual(timeSheetStatusUpdate);
  });
  it('should update time sheet', async() => {
    const result = await timeSheetService.updateTimeSheet(createTimeSheetInput, 1, null);
    expect(result).toEqual(createTimeSheetResponse);
  });
});