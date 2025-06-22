# madabclick

Science In A Click \
Quality content for children \

* Website: <https://madabclick-frontend.onrender.com/he/>
* Origin Website Link: <https://madabclick.madaney.net/he/>
* GitHub: <https://github.com/omer-priel/madabclick>
* Google Drive: <https://drive.google.com/drive/folders/1Jg3n8xkLEtAfkz5vPlV0N0s7QNT2TxU0>

## Technologies

* NextJS (React)
* TypeScript
* TailwindCSS
* Docker
* AWS
* Terraform

## Deployment

AWS Infrastructure - Amplify

```mermaid
flowchart TD
  subgraph GitHub
    PR[Pull Request / Push] --> GA[GitHub Actions]
  end

  subgraph AWS Amplify
    Amplify --> Build --> Lambda
    CHR[Client HTTP Request] --> Domain --> Lambda
  end
  
  GA --> Amplify
```

AWS Infrastructure - EC2

```mermaid
flowchart TB
  subgraph GitHub
    PR[Pull Request / Push] --> GA[GitHub Actions] --> GInstall[Install] --> GLint[Lint] --> GBuild[Build] 
  end

  GBuild --> CodeDeploy

  ClientRequest[Client HTTP Request] --> Domain --> ALB

  subgraph AWS 
    subgraph Image Building
      subgraph BuildInstance
        ImageComponentBuild[Component Build Step]
      end
      subgraph TestInstance
        ImageComponentTest[Component Test Step]
      end
      ImageComponentBuild --> ImageComponentTest --> Image
    end

    ALB[Appliction Load Balancer]
    ASG[Auto Scalling Group]
    EC2[Group of EC2 instances]

    Image --> LT[Lanch Template]
    
    ASG --> LT --> EC2

    ALB --> EC2

    CodeDeploy[CodeDeploy Deployment Group] --> Deployment[CodeDeploy Deployment] --> EC2

    ASG --> Deployment

    ASG <--> EC2
  end

  EC2 --> GoogleAPI[Google API]    
```

AWS Networking Infrastructure - EC2

```mermaid
flowchart TB
  ClientRequest[Client HTTP Request] --> Domain --> ALB
  subgraph AWS
    subgraph VPC
      ALB[Appliction Load Balancer]
      ASG[Auto Scalling Group]

      ALB ---> EC2A
      ASG <--> EC2A
            
      ASG <--> EC2B
      ALB ---> EC2B
      
      subgraph Public Subnet A
        EC2A[Group of EC2 instances]
      end
      subgraph Public Subnet B
        EC2B[Group of EC2 instances]
      end
    end
  end

  EC2A & EC2B --> GoogleAPI[Google API]
```

AWS Infrastructure - ECS

```mermaid
flowchart TB
  subgraph GitHub
    PR[Pull Request / Push] --> GA[GitHub Actions]
    subgraph Build Image
      Install --> Lint --> Build
    end
    GA --> Install
    Build --> Deploy
  end

  ClientRequest[Client HTTP Request] --> Domain --> ALB

  subgraph AWS 
    ALB[Appliction Load Balancer]
    Service[ECS Service]
    Containers[ECS Containers]
    ECR[ECR Repo]

    ECR --> Image[ECR Image]
    
    Image --> Service --> Containers
    ALB --> Containers

    Deploy -->|Push new Image|ECR
    Deploy -->|Update ECS Service|Service
  end

  Containers --> MongoDB
  Containers --> GoogleAPI[Google API] 
```

AWS Networking Infrastructure - ECS

```mermaid
flowchart TB
  ClientRequest[Client HTTP Request] --> Domain --> ALB
  subgraph AWS
    subgraph VPC
      ALB[Appliction Load Balancer]

      ALB ---> ContainersA & ContainersB

      subgraph Public Subnet A
        ContainersA[ECS Containers]
      end
      subgraph Public Subnet B
        ContainersB[ECS Containers]
      end
    end
  end

  ContainersA & ContainersB --> MongoDB
  ContainersA & ContainersB --> GoogleAPI[Google API] 
```

Today it runs in render.com totally free

## Environment Variables

| Name                           | Description                             |
|--------------------------------|-----------------------------------------|
| APP_REVALIDATE                 | Time in seconds of rebuild the App Page |
| APP_STORAGE                    | Path for the storage directory          |
| GOOGLE_API_KEY                 | Google API Key for Google Sheets API    |
| GOOGLE_SPREADSHEET_ID_CONTENTS | Google Spreadsheet ID of contents sheet |
| MONGO_URI                      | Mongo URI                               |
| MONGO_DB_NAME                  | Mongo Database Name                     |

In local developemt. Create '.env' file in frontent that will contain the Environment Variables.

## SSL Keys

TODO \
ssh-keygen -t rsa -b 4096 -f infra/keys/frontend

## Requirements

* nvm
* terraform (optional)

## Install

For install this project run the following commands in the terminal:

```bash
nvm install 20.9.0

nvm use

npm install --global yarn

cd frontend
yarn install
```

## Get Stated

Run the following commands in the terminal:

```bash
bash scripts/start.sh
```

The website will open on <http://localhost:3000/>

## CI: Formatters and Linters

Run the following commands in the terminal for run the formatters and linters:

```bash
bash scripts/fix-lint.sh
```

## Production

The production website will be build each time that the main branch is updated
