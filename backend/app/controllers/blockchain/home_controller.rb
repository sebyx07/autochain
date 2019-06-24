module Blockchain
  class HomeController < ApplicationController
    layout "blockchain"
    def index
      @latest_blocks = latest_blocks
      @graph = build_stats_graph
    end

    def build_stats_graph
      # Transactions.order(created_at: :desc).last(1000)
    end

    def latest_blocks
      Block.order(index: :desc).limit(2).to_a.each_with_index.map do |block, i|
        text = "Blocul curent"
        if i > 0
          text = "Blocul precendent"
        end
        { block: block, text: text }
      end
    end
  end
end