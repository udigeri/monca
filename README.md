# Moneris

## Get Ticket Number - PreLoad

**Request**
```rest
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "store_id": "{{$dotenv STORE_ID}}",
  "api_token": "{{$dotenv API_TOKEN}}",
  "checkout_id": "{{$dotenv CHECKOUT_ID}}",
  "txn_total": "0.00",
  "environment": "qa",
  "action": "preload",
  "order_no": "cartId:{{$guid}}",
  // optional
  "cust_id": "corrId:{{$guid}}",
  "language": "fr"
}' 'https://gatewayt.moneris.com/chktv2/request/request.php'
```

**Response**
```json
{
  "response": {
    "success": "true",
    "ticket": "1726560498e1DHVkvi5k9RckkoFOlFXhdJ52zsnF"
  }
}
```

## Get Receipt - Ticket Number

**Request**
```rest
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "store_id": "{{$dotenv STORE_ID}}",
  "api_token": "{{$dotenv API_TOKEN}}",
  "checkout_id": "{{$dotenv CHECKOUT_ID}}",
  "ticket": "1726560498e1DHVkvi5k9RckkoFOlFXhdJ52zsnF",
  "environment": "qa",
  "action": "receipt"
}' 'https://gatewayt.moneris.com/chktv2/request/request.php'
```

**Response invalid**

```json
{
  "response": {
    "success": "false",
    "error": {
      "field": "ticket",
      "message": "invalid ticket or transaction is not complete"
    }
  }
}
```

**Response ok**
```json
{
  "response": {
    "success": "true",
    "request": {
      "txn_total": "0.00",
      "cust_info": {
        "first_name": null,
        "last_name": null,
        "phone": null,
        "email": null
      },
      "shipping": {
        "address_1": null,
        "address_2": null,
        "city": null,
        "country": null,
        "province": null,
        "postal_code": null
      },
      "billing": null,
      "cc_total": "0.00",
      "pay_by_token": "0",
      "cc": {
        "first6last4": "4242424242",
        "expiry": "0125",
        "cardholder": "Me"
      },
      "ticket": "1725949780VuxBjlqjGm2J9R7me5AbvNPHA9dbdT",
      "cust_id": null,
      "dynamic_descriptor": null,
      "order_no": "cartId:12c32eb7-e2bf-4804-9eee-7201199be88b",
      "issuer_id": "024091002301439",
      "eci": "7"
    },
    "receipt": {
      "result": "a",
      "cc": {
        "result": "a",
        "order_no": "cartId:12c32eb7-e2bf-4804-9eee-7201199be88b_veri",
        "cust_id": null,
        "transaction_no": "14-0_892",
        "reference_no": "660191770010020100",
        "transaction_code": "06",
        "transaction_type": "200",
        "transaction_date_time": "2024-09-10 02:30:14",
        "corporate_card": null,
        "amount": "0.00",
        "response_code": "027",
        "iso_response_code": "01",
        "approval_code": "000000",
        "card_type": "V",
        "dynamic_descriptor": null,
        "invoice_number": null,
        "customer_code": null,
        "eci": "7",
        "cvd_result_code": "1M",
        "avs_result_code": null,
        "cavv_result_code": null,
        "first6last4": "4242424242",
        "expiry_date": "0125",
        "recur_success": null,
        "issuer_id": "024091002301439",
        "is_debit": "false",
        "ecr_no": "66019177",
        "batch_no": "002",
        "sequence_no": "010",
        "tokenize": {
          "success": "true",
          "first4last4": "4242***4242",
          "datakey": "hVndXyNargNJocZgGkbOT7h02",
          "status": "001",
          "message": "Successfully registered CC details."
        },
        "fraud": {
          "cvd": {
            "decision_origin": "Moneris",
            "result": "1",
            "condition": "0",
            "status": "success",
            "code": "1M",
            "details": ""
          },
          "avs": {
            "decision_origin": "Moneris",
            "result": "3",
            "condition": "0",
            "status": "disabled",
            "code": "",
            "details": ""
          },
          "3d_secure": {
            "decision_origin": "Moneris",
            "result": "3",
            "condition": "1",
            "status": "disabled",
            "code": "",
            "details": ""
          },
          "kount": {
            "decision_origin": "Moneris",
            "result": "3",
            "condition": null,
            "status": "disabled",
            "code": "",
            "details": ""
          }
        }
      }
    }
  }
}
```

**Response nok**
```json
{
  "response": {
    "success": "true",
    "request": {
      "txn_total": "0.00",
      "cust_info": {
        "first_name": null,
        "last_name": null,
        "phone": null,
        "email": null
      },
      "shipping": {
        "address_1": null,
        "address_2": null,
        "city": null,
        "country": null,
        "province": null,
        "postal_code": null
      },
      "billing": null,
      "cc_total": "0.00",
      "pay_by_token": "0",
      "cc": {
        "first6last4": "6250940771",
        "expiry": "1249",
        "cardholder": "Moneris test"
      },
      "ticket": "1726560498e1DHVkvi5k9RckkoFOlFXhdJ52zsnF",
      "cust_id": "corrId:1ca368b4-9b65-47f7-b57d-01bab0d6aae3",
      "dynamic_descriptor": null,
      "order_no": "cartId:001c6ea2-f8dd-4e33-96cb-ba46aa0aa0b0",
      "eci": "7"
    },
    "receipt": {
      "result": "d",
      "cc": {
        "result": "d",
        "order_no": "cartId:001c6ea2-f8dd-4e33-96cb-ba46aa0aa0b0_veri",
        "cust_id": "corrId:1ca368b4-9b65-47f7-b57d-01bab0d6aae3",
        "transaction_no": "59-0_899",
        "reference_no": "660188950010010610",
        "transaction_code": "06",
        "transaction_type": "200",
        "transaction_date_time": "2024-09-17 04:10:17",
        "corporate_card": null,
        "amount": "0.00",
        "response_code": "055",
        "iso_response_code": "40",
        "approval_code": "000000",
        "card_type": "UP",
        "dynamic_descriptor": null,
        "invoice_number": null,
        "customer_code": null,
        "eci": "7",
        "cvd_result_code": "null",
        "avs_result_code": null,
        "cavv_result_code": null,
        "first6last4": "6250940771",
        "expiry_date": "1249",
        "recur_success": null,
        "issuer_id": "null",
        "is_debit": "false",
        "ecr_no": "66018895",
        "batch_no": "001",
        "sequence_no": "061",
        "fraud": {
          "cvd": {
            "decision_origin": "Moneris",
            "result": "4",
            "condition": "0",
            "status": "ineligible",
            "code": "",
            "details": ""
          },
          "avs": {
            "decision_origin": "Moneris",
            "result": "3",
            "condition": "0",
            "status": "disabled",
            "code": "",
            "details": ""
          },
          "3d_secure": {
            "decision_origin": "Moneris",
            "result": "3",
            "condition": "1",
            "status": "disabled",
            "code": "",
            "details": ""
          },
          "kount": {
            "decision_origin": "Moneris",
            "result": "3",
            "condition": null,
            "status": "disabled",
            "code": "",
            "details": ""
          }
        }
      }
    }
  }
}
```