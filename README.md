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
Using Full AWS Infrastructure

```mermaid
flowchart TB
  subgraph GitHub
    PR[Pull Request / Push] --> GA[GitHub Actions] --> GInstall[Install] --> GLint[Lint] --> GBuild[Build] 
  end

  ClientRequest[Client HTTP Request] --> Domain --> NLB

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

    CodeDeploy[CodeDeploy Deployment Group] --> Deployment[CodeDeploy Deployment] --> EC2[Group of EC2 instances]
    Image --> LT[Lanch Template]
    ASG[Auto Scalling Group] --> LT ---> EC2
    ASG --> Deployment
    NLB[Network Load Balancer] --> ALB[Appliction Load Balancer] --> EC2
    ALB <--> ASG
    SG[Security Group] --> EC2
  end
    
  GBuild --> CodeDeploy
```

Using Full AWS Networking Infrastructure

```mermaid
flowchart TB
  ClientRequest[Client HTTP Request] --> Domain --> NLB
  subgraph AWS
    subgraph VPC
      NLB[Network Load Balancer]
      ALB[Appliction Load Balancer]
      ASG[Auto Scalling Group]
      NG[NAT Gateway]

      NLB --> ALB --> ASG

      ALB --> EC2A
      ASG --> EC2A
            
      ASG --> EC2B
      ALB --> EC2B
      
      subgraph Private Subnet A
        EC2A[Group of EC2 instances]
      end
      subgraph Private Subnet B
        EC2B[Group of EC2 instances]
      end

      EC2A --> NG
      EC2B --> NG
    end
  end

  NG --> GoogleAPI[Google API]
```


## Environment Variables

| Name                           | Description                             |
|--------------------------------|-----------------------------------------|
| APP_REVALIDATE                 | Time in seconds of rebuild the App Page |
| GOOGLE_API_KEY                 | Google API Key for Google Sheets API    |
| GOOGLE_SPREADSHEET_ID_CONTENTS | Google Spreadsheet ID of contents sheet |

In local developemt. Create '.env' file in frontent that will contain the Environment Variables.

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
