# 🚀 HTTP Button PCF

A Power Apps custom component (PCF) that allows you to send HTTP requests from your app locally

---


# ⚠️ Important Notice on Security and DLP

This component executes HTTP requests directly in the user’s browser, which means it does not comply with Power Platform Data Loss Prevention (DLP) policies.

➡️ Please use this component at your own risk, especially in environments with strict governance, security, or compliance requirements.

I recommend using it only with trusted APIs and avoiding sensitive or confidential data in ungoverned environments.

---

## ✨ Features

- Send HTTP requests (GET, POST, PUT, PATCH, DELETE)
- Fully configurable:
  - Font size, color, and weight
  - Border and background styles
  - Button text and behavior
- Built with React + Fluent UI

<img width="1470" alt="Screenshot 2025-07-04 at 12 07 31 PM" src="https://github.com/user-attachments/assets/536be601-d57a-4904-84b6-5c79f283afa4" />


## 📦 Download

You can download the latest managed solution here:

➡️ [Download HttpButton_Managed.zip](https://github.com/TuongDoan/http-button-pcf/releases/download/v1.0.1/HttpButton_Managed.zip)

---

## 🛠️ Input Properties

| display-name-key           | Description                                                                                     |
|----------------------------|-------------------------------------------------------------------------------------------------|
| 🔤 **Text**                | Text displayed on the button (e.g. “Send Request”).                                            |
| 🌐 **Target endpoint**     | HTTPS URL of the REST endpoint to call (must begin with `https://`).                            |
| 📨 **Method**              | HTTP method: POST, GET, PUT, PATCH or DELETE.                                                  |
| 📦 **JSON payload**        | JSON payload string (required for POST/PUT/PATCH).                                             |
| 🔑 **Authentication Type** | Authentication type: None, Basic or API Key.                                                   |
| 👤 **Basic Auth Username** | Username for Basic auth (if **Authentication Type** = Basic).                                   |
| 🔒 **Basic Auth Password** | Password for Basic auth (if **Authentication Type** = Basic).                                   |
| 🏷️ **API Key Header Name** | Header name for API Key (if **Authentication Type** = API Key).                                 |
| 🗝️ **API Key Value**       | API Key value (if **Authentication Type** = API Key).                                           |
| 🎨 **FontName**            | Font family for button text (e.g. “Segoe UI”).                                                 |
| 🎨 **FontSize**            | Font size in pixels (e.g. `10.5`).                                                              |
| 🎨 **FontColor**           | Color of the text when enabled.                                                                |
| 🎨 **FontWeight**          | Text weight: normal, bold, bolder, lighter.                                                    |
| 🎨 **DisabledFontColor**   | Color of the text when disabled.                                                               |
| 🎨 **DisabledFillColor**   | Background color when disabled.                                                                |
| 🎨 **BorderColor**         | Button border color.                                                                           |
| 🎨 **BorderThickness**     | Border thickness in pixels.                                                                    |
| 🎨 **BorderRadius**        | Border corner radius in pixels.                                                                |


> 📌 **Note:** POST requests require a valid JSON payload.


## 📤 Output Properties

| display-name-key | Description                                            |
|------------------|--------------------------------------------------------|
| 📊 **Responses**    | JSON string with `statusCode` and `body` of the HTTP response. |


📊 **Read the Response**  
   - The control outputs a JSON string in the **Responses** field, for example:  
     ```json
     {
       "statusCode": 200,
       "body": "{ \"success\": true }"
     }
     ```  



