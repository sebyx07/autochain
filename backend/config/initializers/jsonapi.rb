JSONAPI.configure do |config|
  config.json_key_format = :underscored_key
  config.raise_if_parameters_not_allowed = false
  config.default_paginator = :paged
  config.default_page_size = 20
  config.maximum_page_size = 20

  config.top_level_meta_include_page_count = true
  config.top_level_meta_page_count_key = :page_count

  config.top_level_meta_include_record_count = true
  config.top_level_meta_record_count_key = :record_count
end
