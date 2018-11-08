### go-schema

    Examines Schema structure for mongoDB databases hosted at localhost.
    
    Usage
    
      You must specify database and collection.
      
      Outputs document keys and their types, recursively traversing objects and
      arrays. Unless 'all' option is specified, outputs one composite meta-document
      reflectingthe structure of all the documents such that if any key appears in any
      document,then those keys are included in the composite.
      
      Optional arguments:
      
      keysonly => only outputs primary keys from all documents
      
      all => Outputs a separate meta-document for each document type. If every
      document has the same structure then only one meta-document will be output. This
      option is useful to identify if documents have varying structures and outputs a
      meta-document for each document unique type.
      
      full => If not specified, the uniqueness of documents is determined by key names
      only. Specifying 'full' includes the types of keys for determining unique
      signatures.
      
    
    Options
    
      -d, --database string      
      -c, --collection string    
      -k, --keysonly             
      -a, --all                  
      -f, --full                 

### Installation
```shell
    $ npm install go-schema
    $ sudo mongod
```

### Example

```js
    go-schema -d crunchbase -c companies    
```

### Results

```js
Successfully connected to MongoDB.
{
    _id: 'ObjectId'
    acquisition: {
        acquired_day: 'number'
        acquired_month: 'number'
        acquired_year: 'number'
        acquiring_company: {
            name: 'string'
            permalink: 'string'
        }
        price_amount: 'number'
        price_currency_code: 'string'
        source_description: 'string'
        source_url: 'string'
        term_code: 'string'
    }
    acquisitions: [
        {
            acquired_day: 'number'
            acquired_month: 'number'
            acquired_year: 'number'
            company: {
                name: 'string'
                permalink: 'string'
            }
            price_amount: null
            price_currency_code: 'string'
            source_description: 'string'
            source_url: 'string'
            term_code: null
        }
    ]
    alias_list: 'string'
    blog_feed_url: 'string'
    blog_url: 'string'
    category_code: 'string'
    competitions: [
        {
            competitor: {
                name: 'string'
                permalink: 'string'
            }
        }
    ]
    created_at: 'Date'
    crunchbase_url: 'string'
    deadpooled_day: 'number'
    deadpooled_month: 'number'
    deadpooled_url: 'string'
    deadpooled_year: 'number'
    description: 'string'
    email_address: 'string'
    external_links: [
        {
            external_url: 'string'
            title: 'string'
        }
    ]
    founded_day: 'number'
    founded_month: 'number'
    founded_year: 'number'
    funding_rounds: [
        {
            funded_day: 'number'
            funded_month: 'number'
            funded_year: 'number'
            id: 'number'
            investments: [
                {
                    company: null
                    financial_org: {
                        name: 'string'
                        permalink: 'string'
                    }
                    person: null
                }
            ]
            raised_amount: 'number'
            raised_currency_code: 'string'
            round_code: 'string'
            source_description: 'string'
            source_url: 'string'
        }
    ]
    homepage_url: 'string'
    image: {
        attribution: null
        available_sizes: [
            [
                [
                    'number'
                ]
                'string'
            ]
        ]
    }
    investments: [
        {
            funding_round: {
                company: {
                    name: 'string'
                    permalink: 'string'
                }
                funded_day: 'number'
                funded_month: 'number'
                funded_year: 'number'
                raised_amount: 'number'
                raised_currency_code: 'string'
                round_code: 'string'
                source_description: 'string'
                source_url: 'string'
            }
        }
    ]
    ipo: {
        pub_day: 'number'
        pub_month: 'number'
        pub_year: 'number'
        stock_symbol: 'string'
        valuation_amount: 'number'
        valuation_currency_code: 'string'
    }
    milestones: [
        {
            description: 'string'
            id: 'number'
            source_description: 'string'
            source_text: null
            source_url: 'string'
            stoneable: {
                name: 'string'
                permalink: 'string'
            }
            stoneable_type: 'string'
            stoned_acquirer: null
            stoned_day: 'number'
            stoned_month: 'number'
            stoned_value: null
            stoned_value_type: null
            stoned_year: 'number'
        }
    ]
    name: 'string'
    number_of_employees: 'number'
    offices: [
        {
            address1: 'string'
            address2: 'string'
            city: 'string'
            country_code: 'string'
            description: 'string'
            latitude: 'number'
            longitude: 'number'
            state_code: 'string'
           p_code: 'string'
        }
    ]
    overview: 'string'
    partners: [
        {
            homepage_url: 'string'
            link_1_name: 'string'
            link_1_url: 'string'
            link_2_name: null
            link_2_url: null
            link_3_name: null
            link_3_url: null
            partner_name: 'string'
        }
    ]
    permalink: 'string'
    phone_number: 'string'
    products: [
        {
            name: 'string'
            permalink: 'string'
        }
    ]
    providerships: [
        {
            is_past: 'boolean'
            provider: {
                name: 'string'
                permalink: 'string'
            }
            title: 'string'
        }
    ]
    relationships: [
        {
            is_past: 'boolean'
            person: {
                first_name: 'string'
                last_name: 'string'
                permalink: 'string'
            }
            title: 'string'
        }
    ]
    screenshots: [
        {
            attribution: null
            available_sizes: [
                [
                    [
                        'number'
                    ]
                    'string'
                ]
            ]
        }
    ]
    tag_list: 'string'
    total_money_raised: 'string'
    twitter_username: 'string'
    updated_at: 'string'
    video_embeds: [
        {
            description: 'string'
            embed_code: 'string'
        }
    ]
}
 

```
