# Tempea

[![Build Status](https://travis-ci.org/eiabea/tempea-api.svg?branch=master)](https://travis-ci.org/eiabea/tempea-api)
[![Coverage Status](https://coveralls.io/repos/github/eiabea/tempea-api/badge.svg?branch=master)](https://coveralls.io/github/eiabea/tempea-api?branch=master)

# [WIP] Setup

## [WIP] System

### Raspbian

1. Get the latest lite version of raspbian from the official [download page](https://www.raspberrypi.org/downloads/raspbian/)
2. Unzip the image
```
unzip 2018-11-13-raspbian-stretch-lite.zip
```
3. Insert sd card into your pc
4. Run the following command to find out the name of the sd card
```
dmesg
```
5. Flash the image using dd (may requires root permissions)
```
dd if=/home/eiabea/2018-11-13-raspbian-stretch-lite.img of=/dev/mmcblk0 bs=4M && sync
```
6. Wait until the command finishes successfully
7. Remove and reinsert the sd card to get it mounted
8. To set a static ip address open up the _etc/network/interfaces_ file on the sd card and paste the following content (may requires root permissions)
```
# interfaces(5) file used by ifup(8) and ifdown(8)

# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'

# Include files from /etc/network/interfaces.d:
source-directory /etc/network/interfaces.d

auto lo
iface lo inet loopback

iface eth0 inet manual
```
9. Open up the _etc/dhcpcd.conf_ and add the following content at the end of the file. Edit the values according to your network (may requires root permissions)
```
interface eth0
static ip_address=192.168.0.8/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1 8.8.8.8 4.2.2.1
```
10. Create a blank file on the boot partition named ssh to enable ssh
```
touch ssh
```
11. Unmount and remove the sd card from your pc and insert it into your raspberry pi
12. Connect a ethernet cable between your router and the raspberry pi
13. Connect the power supply to boot up the raspberry pi
14. Login via ssh (username: pi, password: raspberry)
```
ssh pi@192.168.0.8
```
15. Update the system to the latest version
```
sudo apt update && sudo apt upgrade -y
```

### Docker

1. Run the following command to install docker
```
curl -sSL https://get.docker.com | sh
```
2. Add the pi user to the docker group to start container as user
```
sudo usermod -aG docker pi
```
3. Log out and in again to gain access to docker
4. Verify the correct installation of docker
```
docker ps
```
5. Install docker-compose
```
sudo apt install -y python-pip
sudo pip install docker-compose
```
6. Verify the correct installation of docker-compose
```
docker-compose version
```

## [WIP] Hardware

### [WIP] Schematics

## [WIP] Software
## [WIP] Required packages

## [WIP] Tempea itself
### [WIP] Tempea-slave

# [WIP] Contribution
## [WIP] Testing