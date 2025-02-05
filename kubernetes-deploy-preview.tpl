apiVersion: apps/v1
kind: Deployment
metadata:
  name: moj-frontend-${BRANCH}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: moj-frontend-${BRANCH}
  template:
    metadata:
      labels:
        app: moj-frontend-${BRANCH}
    spec:
      containers:
      - name: moj-frontend
        image: ${REGISTRY}/${REPOSITORY}:${IMAGE_TAG}
        env:
          - name: USERNAME
            valueFrom:
              secretKeyRef:
                name: basic-auth
                key: username
          - name: PASSWORD
            valueFrom:
              secretKeyRef:
                name: basic-auth
                key: password
        ports:
        - containerPort: 3000
      - name: express-app
        image: ${REGISTRY}/${REPOSITORY}:express-${IMAGE_TAG}
        env:
          - name: GITHUB_API_URL
            valueFrom:
              secretKeyRef:
                name: github-api-url
                key: github-api-url
          - name: GITHUB_API_TOKEN
            valueFrom:
              secretKeyRef:
                name: github-api-token
                key: github-api-token
          - name: GITHUB_REPO_OWNER
            valueFrom:
              secretKeyRef:
                name: github-repo-owner
                key: github-repo-owner
          - name: GITHUB_REPO_NAME
            valueFrom:
              secretKeyRef:
                name: github-repo-name
                key: github-repo-name
          - name: NOTIFY_PR_TEMPLATE
            valueFrom:
              secretKeyRef:
                name: notify-pr-template
                key: notify-pr-template
          - name: NOTIFY_SUBMISSION_TEMPLATE
            valueFrom:
              secretKeyRef:
                name: notify-submission-template
                key: notify-submission-template
          - name: NOTIFY_EMAIL
            valueFrom:
              secretKeyRef:
                name: notify-email
                key: notify-email
          - name: NOTIFY_TOKEN
            valueFrom:
              secretKeyRef:
                name: notify-token
                key: notify-token
        ports:
        - containerPort: 3001
        securityContext:
          runAsNonRoot: false
---
apiVersion: v1
kind: Service
metadata:
  name: express-app-${BRANCH}
  labels:
    app: express-app-${BRANCH}
spec:
  ports:
  - port: 3001
    name: express
    targetPort: 3001
  selector:
    app: moj-frontend-${BRANCH}
---
apiVersion: v1
kind: Service
metadata:
  name: moj-frontend-service-${BRANCH}
  labels:
    app: moj-frontend-service-${BRANCH}
spec:
  ports:
  - port: 3000
    name: http
    targetPort: 3000
  selector:
    app: moj-frontend-${BRANCH}
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: moj-frontend-ingress-${BRANCH}
  annotations:
    external-dns.alpha.kubernetes.io/set-identifier: moj-frontend-ingress-${BRANCH}-${KUBE_NAMESPACE}-green
    external-dns.alpha.kubernetes.io/aws-weight: "100"
spec:
  ingressClassName: default
  tls:
  - hosts:
    - ${KUBE_NAMESPACE}-${BRANCH}.apps.live.cloud-platform.service.justice.gov.uk
  rules:
  - host: ${KUBE_NAMESPACE}-${BRANCH}.apps.live.cloud-platform.service.justice.gov.uk
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
        backend:
          service:
            name: moj-frontend-service-${BRANCH}
            port:
              number: 3000