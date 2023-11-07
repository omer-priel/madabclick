# quality-content-for-children

Science In A Click \
Quality content for children \

* Website: <https://main.d2agpnuowxjy03.amplifyapp.com>
* GitHub: <https://github.com/omer-priel/quality-content-for-children>
* Google Drive: <https://drive.google.com/drive/folders/1Jg3n8xkLEtAfkz5vPlV0N0s7QNT2TxU0>

## Deployment

Now using Amplify

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

AWS Infrastructure

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

AWS Networking Infrastructure

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

AWS Infrastructure + DB \
TODO

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

AWS Networking Infrastructure + DB

```mermaid
flowchart TB
  ClientRequest[Client HTTP Request] --> Domain --> WebALB
  subgraph AWS
    subgraph VPC
      WebALB[Frontend Appliction Load Balancer]
      WebASG[Frontend Auto Scalling Group]

      MongoALB[DB Appliction Load Balancer]
      MongoASG[DB Auto Scalling Group]
      MongoEBSData[DB Storage]

      WebALB ---> WebEC2A
      WebASG <--> WebEC2A
            
      WebASG <--> WebEC2B
      WebALB ---> WebEC2B

      MongoALB ---> MongoEC2A
      MongoASG <--> MongoEC2A
            
      MongoASG <--> MongoEC2B
      MongoALB ---> MongoEC2B
      
      subgraph Public Subnet A
        WebEC2A[Frontend group of EC2 instances]
        MongoEC2A[Frontend group of EC2 instances]
      end
      subgraph Public Subnet B
        WebEC2B[DB group of EC2 instances]
        MongoEC2B[DB group of EC2 instances]
      end

      WebEC2A & WebEC2B --> MongoALB
      MongoEC2A & MongoEC2B --> MongoEBSData
    end
  end

  WebEC2A & WebEC2B --> GoogleAPI[Google API]
```


## Environment Variables

| Name                           | Description                             |
|--------------------------------|-----------------------------------------|
| APP_REVALIDATE                 | Time in seconds of rebuild the App Page |
| GOOGLE_API_KEY                 | Google API Key for Google Sheets API    |
| GOOGLE_SPREADSHEET_ID_CONTENTS | Google Spreadsheet ID of contents sheet |

In local developemt. Create '.env' file in frontent that will contain the Environment Variables.

## SSL Keys

TODO \
ssh-keygen -t rsa -b 4096 -f infra/keys/frontend

## Requirements

* nvm

## Install

For install this project run the following commands in the terminal:

```bash
nvm install 16.0.0

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

## Development CI/CD

Run the following commands in the terminal for run the formatters and linters:

```bash
bash scripts/fix-lint.sh
```

## Production

The production website will be build each time that the main branch is updated

# Authors

* Omer Priel
