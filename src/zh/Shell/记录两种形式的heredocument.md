# 记录两种形式的heredocument
```bash
root@ip-172-31-13-117:~# cat >> /etc/rancher/k3s/registries.yaml <<EOF

mirrors:
  "harbor.kingsd.top":
    endpoint:
      - "https://harbor.kingsd.top"
configs:
  "harbor.kingsd.top":
    auth:
      username: admin # this is the registry username
      password: Harbor12345 # this is the registry password
EOF
systemctl restart k3s
```


```bash
root@ip-172-31-13-117:~# cat <<EOF>> /etc/rancher/k3s/registries.yaml 
mirrors:
  "harbor.kingsd.top":
    endpoint:
      - "https://harbor.kingsd.top"
configs:
  "harbor.kingsd.top":
    auth:
      username: admin # this is the registry username
      password: Harbor12345 # this is the registry password
EOF
systemctl restart k3s
```
功能效果都是一样的
