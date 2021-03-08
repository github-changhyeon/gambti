# HTTPS 설정

* **letsencrypt 설치**

```sh
$ sudo apt update
$ sudo apt-get install letsencrypt -y
```



* **SSL 인증서 받기**

```sh
$ certbot certonly --standalone -d www.gambti.com	
```

* standalone 옵션으로 발급
* 웹서버가 실행중이면 종료해야 함



* **인증서 자동 갱신**

  ```sh
  $ sudo crontab -e
  ```

  ```bash
  #도커 사용하면 &&뒤에 nginx reload 맞춰서 변경하기
  
  # ubuntu 16.04
  15 3 * * * certbot-auto renew && /etc/init.d/nginx reload
  
  # ubuntu 18.04
  15 3 * * * certbot-auto renew --quiet --renew-hook "/etc/init.d/nginx reload"
  
  30 2 1 1-12 * /usr/bin/letsencrypt renew >> /var/log/le-renew.log 
  35 2 1 1-12 * /bin/systemctl reload nginx
  # 매월 1일 새벽 2시 30분에 인증서가 갱신되며
  # 매월 1일 새벽 2시 35분에 nginx를 재실행 합니다.
  ```

  



# docker 설정

* **docker compose**

  ```yaml
  #docker-compose.yml
  version: '3'
  
  services:
          nginx:
                  image : nginx:1.18.0
                  ports:
                          - 80:80
                          - 443:443
  
                  volumes:
                          - ./nginx/nginx.conf:/etc/nginx/nginx.conf
                          - ./proxy:/etc/nginx/conf.d
                          - /etc/letsencrypt:/etc/letsencrypt
                          - /var/www/letsencrypt:/var/www/letsencrypt
                          - ./frontend:/var/www/html
  ```



<br><br>

* **nginx config**

  ```yaml
  # nginx.conf
  
  user nginx;
  worker_processes 1;
  
  pid         /var/run/nginx.pid;
  
  events {
      worker_connections  1024;
  }
  
  http {
      access_log  /var/log/nginx/access.log;
      error_log   /var/log/nginx/error.log;
  
      include       /etc/nginx/mime.types;
      default_type  application/octet-stream;
  
      sendfile        on;
      keepalive_timeout  65;
      include /etc/nginx/conf.d/*.conf;
  }
  ```

  

<br><br>

* **reverse proxy**

  ```yaml
  #proxy.conf
  server {
      listen 80;
  
      server_name 54.180.105.93;
  
      location / {
          return 301 https://www.gambti.com$request_uri;
      }
  }
  
  server {
      # 서버 포트를 80번으로 오픈
      listen 80;
      # 설정할 도메인(IP) 지정
      server_name www.gambti.com;
  
      location / {
          return 301 https://$host$request_uri;
      }
      # 엑세스 로그, 오류 로그를 남길 파일 경로 지정
      access_log /var/log/nginx/access.log;
      error_log /var/log/nginx/error.log;
  }
  
  server {
      # 서버 포트를 443번으로 오픈
      listen 443;
      # 설정할 도메인(IP) 지정
      server_name www.gambti.com;
  
      root /var/www/html;
      index index.php index.html index.htm index.nginx-debian.html;
  
      access_log /var/log/nginx/access.log;
      error_log /var/log/nginx/error.log;
  
      location / {
                  proxy_intercept_errors on;
                  try_files $uri $uri/ /index.html;
      }
  
      # nginx에서 HTTPS프로토콜에 이용될 ssl인증서 경로
      ssl on;
      ssl_certificate /etc/letsencrypt/live/www.gambti.com/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/www.gambti.com/privkey.pem;
  }
  ```

