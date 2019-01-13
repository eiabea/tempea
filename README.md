# Tempea

[![Build Status](https://travis-ci.org/eiabea/tempea-api.svg?branch=master)](https://travis-ci.org/eiabea/tempea-api)
[![Coverage Status](https://coveralls.io/repos/github/eiabea/tempea-api/badge.svg?branch=master)](https://coveralls.io/github/eiabea/tempea-api?branch=master)

# Motivation

The thermostat in our flat was pretty basic, so i decided to build my own one based on a [Raspberry Pi](https://www.raspberrypi.org/), [Docker](https://www.docker.com/), [InfluxDB](https://www.influxdata.com/), [node.js](https://nodejs.org/en/), a small PCB with a relay to control the gas boiler and a temperature sensor.

[Grafana](https://grafana.com/) is used to plot the temperature and heating period graphs.

After some research i stumbled over the great idea to use the [Google Calender](https://calendar.google.com) to set a desired temperature. This reduced the complexity of the node application drastically and made it obsolete to expose the raspberry to the internet to manage it from anywhere. 


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

<p align="center">
  <a href="https://raw.githubusercontent.com/eiabea/tempea-api/master/images/rpi_breadboard.jpg" target="_blank">
    <img src="https://raw.githubusercontent.com/eiabea/tempea-api/master/images/rpi_breadboard.jpg" width="350" alt="RaspberryPi with Breadboard">
  </a>
  <a href="https://raw.githubusercontent.com/eiabea/tempea-api/master/images/gpio_closeup.jpg" target="_blank">
    <img src="https://raw.githubusercontent.com/eiabea/tempea-api/master/images/gpio_closeup.jpg" width="350" alt="GPIO Closeup">
  </a>
  <a href="https://raw.githubusercontent.com/eiabea/tempea-api/master/images/breadboard_closeup.jpg" target="_blank">
    <img src="https://raw.githubusercontent.com/eiabea/tempea-api/master/images/breadboard_closeup.jpg" width="350" alt="Breadboard Closeup">
  </a>
</p>

### [WIP] Schematics

## [WIP] Software

### One Wire

```
dtoverlay=w1-gpio,gpiopin=4,pullup=on
```

## [WIP] Required packages

## [WIP] Tempea itself
### [WIP] Tempea-slave

# [WIP] Contribution

## Develop

### Linux
1. Mount the home directory of the pi on your pc
```
mkdir raspberry
sshfs pi@192.168.0.8:/home/pi raspberry
```

2. Clone the project
```
cd raspberry
git clone https://github.com/eiabea/tempea-api.git
```

3. Change into the project directory and create the secrets folder
```
cd tempea-api
mkdir secrets
```

4. Copy the secrets json file from google into the secrets directory and name it _tempea-service.json_ (TODO: step-by-step tutorial)

5. Connect to the Raspberry Pi via ssh (username: pi, password: raspberry)
```
ssh pi@192.168.0.8
```

6. Change to the project directory
```
cd tempea-api
```

7. Start tempea in development mode
```
docker-compose up
```

## Testing

1. Connect to the Raspberry Pi and start the application in development mode like shown in the previous step "Develop"

2. Open up a second terminal and also connect to the Raspberry Pi
```
ssh pi@192.168.0.8
```

3. Run the tests with the following command
```
docker exec -it tempea-api_tempea_1 npm test
```
