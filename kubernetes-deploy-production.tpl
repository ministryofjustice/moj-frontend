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
        ports:
        - containerPort: 3000
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
