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
  "language": "en"
}' 'https://gatewayt.moneris.com/chktv2/request/request.php'
```

**Request**
```json
{
  "store_id": "monca10391",
  "api_token": "tiUxlT5oau4pa0BgMaE7",
  "checkout_id": "chkt5FU7F10391",
  "txn_total": "0.00",
  "environment": "qa",
  "action": "preload",
  "order_no": "cartId:64b33765-0504-4ccc-b9df-4ef1f24a2052",
  "cust_id": "corrId:d32825e0-552d-4be3-97eb-7b1eb2882abe",
  "language": "en"
}
```
**Response**
```json
{
  "response": {
    "success": "true",
    "ticket": "1726820807T55AZxCjC3wAPkKrym0NB8yfd9UvoF"
  }
}
```


**Request check Expired session http status code 410 - Gone**
```rest
curl -X GET --header 'Accept: application/json' -d '{
}' 'https://gatewayt.moneris.com/chktv2/display/index.php?tck=1726573282sFRNlNdlGb4fs1dMsquP54pwJCGEHF'
```

Timeout 5 mins for expiration

https://gatewayt.moneris.com/chktv2/style/images/chkt_apple_pay.png


https://gatewayt.moneris.com/chktv2/style/head_style.php?col2=FDC300&col=3B3F4C&fs=false&font_family=AvenirLT-Roman&font_size=small

https://developer.moneris.com/livedemo/v_admin/get_expiring/tool/java

## Get Receipt - Ticket Number

**Request**
```rest
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "store_id": "{{$dotenv STORE_ID}}",
  "api_token": "{{$dotenv API_TOKEN}}",
  "checkout_id": "{{$dotenv CHECKOUT_ID}}",
  "ticket": "1726820807T55AZxCjC3wAPkKrym0NB8yfd9UvoF",
  "environment": "qa",
  "action": "receipt"
}' 'https://gatewayt.moneris.com/chktv2/request/request.php'
```

**Request**
```json
{
  "store_id": "monca10391",
  "api_token": "tiUxlT5oau4pa0BgMaE7",
  "checkout_id": "chkt5FU7F10391",
  "ticket": "1726820807T55AZxCjC3wAPkKrym0NB8yfd9UvoF",
  "environment": "qa",
  "action": "receipt"
}
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
        "first6last4": "3566005365",
        "expiry": "0126",
        "cardholder": "jcb name"
      },
      "ticket": "1726820807T55AZxCjC3wAPkKrym0NB8yfd9UvoF",
      "cust_id": "corrId:d32825e0-552d-4be3-97eb-7b1eb2882abe",
      "dynamic_descriptor": null,
      "order_no": "cartId:64b33765-0504-4ccc-b9df-4ef1f24a2052",
      "eci": "7"
    },
    "receipt": {
      "result": "a",
      "cc": {
        "result": "a",
        "order_no": "cartId:64b33765-0504-4ccc-b9df-4ef1f24a2052_veri",
        "cust_id": "corrId:d32825e0-552d-4be3-97eb-7b1eb2882abe",
        "transaction_no": "125-0_902",
        "reference_no": "660188950010011180",
        "transaction_code": "06",
        "transaction_type": "200",
        "transaction_date_time": "2024-09-20 04:28:27",
        "corporate_card": null,
        "amount": "0.00",
        "response_code": "025",
        "iso_response_code": "00",
        "approval_code": "118681",
        "card_type": "C1",
        "dynamic_descriptor": null,
        "invoice_number": null,
        "customer_code": null,
        "eci": "7",
        "cvd_result_code": "null",
        "avs_result_code": null,
        "cavv_result_code": null,
        "first6last4": "3566005365",
        "expiry_date": "0126",
        "recur_success": null,
        "issuer_id": "null",
        "is_debit": "false",
        "ecr_no": "66018895",
        "batch_no": "001",
        "sequence_no": "118",
        "tokenize": {
          "success": "true",
          "first4last4": "3566***5365",
          "datakey": "HZEcPUGMKdzs3vSg7F8mDWaX5",
          "status": "001",
          "message": "Successfully registered CC details."
        },
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



## Payment with Token
```rest
curl https://api.stripe.com/v1/payment_intents
  -u "sk_test_tbQBLTsG4qQ8OjX4fxkv9GC800wBRZfbqm:"
  -d amount=1000
  -d currency=jpy
  -d "payment_method_types[]"=card
  -d statement_descriptor_suffix="example descriptor"
```

**Request**
```rest
curl -X POST --header 'Content-Type: text/xml' -d 
"
<?xml version="1.0"?>
<request>
    <res_purchase_cc>
        <data_key>u8xBAh3LhfHed2PTmNTnTSlL2</data_key>
        <order_id>cartId:64b33765-0504-4ccc-b9df-4ef1f24a2062</order_id>
        <cust_id>corrId:d32825e0-552d-4be3-97eb-7b1eb2882abe</cust_id>
        <amount>1.01</amount>
        <crypt_type>7</crypt_type>
        <cof_info>
            <payment_indicator>U</payment_indicator>
            <payment_information>2</payment_information>
            <issuer_id>024092005410066</issuer_id>
        </cof_info>
    </res_purchase_cc>
</request>
" 'https://mpg1t.moneris.io:443/gateway2/servlet/MpgRequest'
```

**Response**
```xml
<?xml version="1.0"?>
<response>
	<receipt>
		<DataKey>WBtBt9oUcBbVsCoeMVSnFdUb4</DataKey>
		<ReceiptId>null</ReceiptId>
		<ReferenceNum>null</ReferenceNum>
		<ResponseCode>null</ResponseCode>
		<ISO>null</ISO>
		<AuthCode>null</AuthCode>
		<Message>The transaction was not sent to the host because of a duplicate order id</Message>
		<TransTime>null</TransTime>
		<TransDate>null</TransDate>
		<TransType>null</TransType>
		<Complete>false</Complete>
		<TransAmount>null</TransAmount>
		<CardType>null</CardType>
		<TransID>null</TransID>
		<TimedOut>false</TimedOut>
		<CorporateCard>false</CorporateCard>
		<RecurSuccess>null</RecurSuccess>
		<AvsResultCode>null</AvsResultCode>
		<CvdResultCode>null</CvdResultCode>
		<ResSuccess>true</ResSuccess>
		<PaymentType>cc</PaymentType>
		<IsVisaDebit>false</IsVisaDebit>
		<ResolveData>
			<cust_id>corrId:0f5805ab-f239-437c-930d-26c13902735b</cust_id>
			<phone></phone>
			<email></email>
			<note>tokenize</note>
			<expdate>2501</expdate>
			<masked_pan>5454***5454</masked_pan>
			<crypt_type>7</crypt_type>
			<avs_street_number></avs_street_number>
			<avs_street_name></avs_street_name>
			<avs_zipcode></avs_zipcode>
		</ResolveData>
	</receipt>
</response>
```

```xml
<?xml version="1.0"?>
<response>
	<receipt>
		<DataKey>WBtBt9oUcBbVsCoeMVSnFdUb4</DataKey>
		<ReceiptId>Test1726639736860</ReceiptId>
		<ReferenceNum>660188950010010800</ReferenceNum>
		<ResponseCode>027</ResponseCode>
		<ISO>01</ISO>
		<AuthCode>T32472</AuthCode>
		<Message>APPROVED           *                    =</Message>
		<TransTime>02:11:35</TransTime>
		<TransDate>2024-09-18</TransDate>
		<TransType>00</TransType>
		<Complete>true</Complete>
		<TransAmount>1.00</TransAmount>
		<CardType>M</CardType>
		<TransID>81-0_900</TransID>
		<TimedOut>false</TimedOut>
		<CorporateCard>false</CorporateCard>
		<RecurSuccess>null</RecurSuccess>
		<AvsResultCode>null</AvsResultCode>
		<CvdResultCode>null</CvdResultCode>
		<ResSuccess>true</ResSuccess>
		<PaymentType>cc</PaymentType>
		<IsVisaDebit>false</IsVisaDebit>
		<ResolveData>
			<cust_id>corrId:0f5805ab-f239-437c-930d-26c13902735b</cust_id>
			<phone></phone>
			<email></email>
			<note>tokenize</note>
			<expdate>2501</expdate>
			<masked_pan>5454***5454</masked_pan>
			<crypt_type>7</crypt_type>
			<avs_street_number></avs_street_number>
			<avs_street_name></avs_street_name>
			<avs_zipcode></avs_zipcode>
		</ResolveData>
		<IssuerId>null</IssuerId>
	</receipt>
</response>
```

```xml
<?xml version="1.0"?>
<response>
	<receipt>
		<DataKey>WBtBt9oUcBbVsCoeMVSnFdUb4</DataKey>
		<ReceiptId>Test1726747179494</ReceiptId>
		<ReferenceNum>660188950010011020</ReferenceNum>
		<ResponseCode>481</ResponseCode>
		<ISO>05</ISO>
		<AuthCode>000000</AuthCode>
		<Message>DECLINED           *                    =</Message>
		<TransTime>08:01:05</TransTime>
		<TransDate>2024-09-19</TransDate>
		<TransType>00</TransType>
		<Complete>true</Complete>
		<TransAmount>2.05</TransAmount>
		<CardType>M</CardType>
		<TransID>108-0_901</TransID>
		<TimedOut>false</TimedOut>
		<CorporateCard>false</CorporateCard>
		<RecurSuccess>null</RecurSuccess>
		<AvsResultCode>null</AvsResultCode>
		<CvdResultCode>null</CvdResultCode>
		<ResSuccess>true</ResSuccess>
		<PaymentType>cc</PaymentType>
		<IsVisaDebit>false</IsVisaDebit>
		<ResolveData>
			<cust_id>corrId:0f5805ab-f239-437c-930d-26c13902735b</cust_id>
			<phone></phone>
			<email></email>
			<note>tokenize</note>
			<expdate>2501</expdate>
			<masked_pan>5454***5454</masked_pan>
			<crypt_type>7</crypt_type>
			<avs_street_number></avs_street_number>
			<avs_street_name></avs_street_name>
			<avs_zipcode></avs_zipcode>
		</ResolveData>
		<IssuerId>null</IssuerId>
	</receipt>
</response>
```